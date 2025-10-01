const express = require("express");
const path = require("path");
const fs = require("fs");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("../cloudinary");

const router = express.Router();

// ===== Create Shop =====

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email exists
    const existingSeller = await Shop.findOne({ email });
    if (existingSeller)
      return next(new ErrorHandler("User already exists", 400));

    let avatarUrl = "";

    // Upload to Cloudinary if file exists
    if (req.file) {
      try {
        avatarUrl = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "shop_avatars" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
      } catch (cloudError) {
        console.error("Cloudinary upload failed:", cloudError);
        return next(new ErrorHandler("Avatar upload failed", 500));
      }
    }

    const sellerData = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: avatarUrl, // Save Cloudinary URL
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };
    // Create activation token
    const activationToken = createActivationToken(sellerData);

    // Activation URL (token passed as path param)
    const activationUrl = `https://multi-vendor-frontend-indol.vercel.app/seller/activation/${activationToken}`;

    // Send activation email
    await sendMail({
      email: sellerData.email,
      subject: "Activate Your Shop",
      message: `Hello ${sellerData.name},\n\nPlease click the link below to activate your shop:\n${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email (${sellerData.email}) to activate your shop!`,
    });
  } catch (error) {
    console.error("Create shop error:", error);
    return next(
      new ErrorHandler(error.message || "Internal Server Error", 500)
    );
  }
});

// Create Activation Token
const createActivationToken = (seller) => {
  if (!process.env.ACTIVATION_SECRET) {
    throw new Error("ACTIVATION_SECRET is missing in .env");
  }
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "15m" });
};

// ===== Activate Shop - Save to DB =====
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    const { activation_token } = req.body;

    let sellerData;
    try {
      sellerData = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (err) {
      return next(new ErrorHandler("Activation token expired or invalid", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      sellerData;

    const existingUser = await Shop.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already activated",
      });
    }

    const seller = await Shop.create({
      name,
      email,
      password,
      avatar,
      zipCode,
      address,
      phoneNumber,
    });

    sendShopToken(seller, 201, res);
  })
);

//login seller
router.post(
  "/login-seller",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load seller
router.get(
  "/getSeller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    if (!req.seller || !req.seller._id) {
      return next(new ErrorHandler("Seller not authenticated", 401));
    }

    const seller = await Shop.findById(req.seller._id);
    console.log("Seller from DB:", seller);

    if (!seller) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  })
);

//shop log out
router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none", 
        secure: true, 
      });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get shopInfo
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      //this will return an object
      const shop = await Shop.findById(req.params.id);
      if (!shop) {
        return next(new ErrorHandler("Seller does'nt exist!", 400));
      }
      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("avatar"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      if (req.file) {
        // delete old avatar from Cloudinary if exists
        if (shop.avatar && shop.avatar.public_id) {
          await cloudinary.uploader.destroy(shop.avatar.public_id);
        }

        // upload new avatar to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "shop_avatars" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });

        // save new Cloudinary details
        shop.avatar = result.secure_url;

        await shop.save();
      }

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      console.error("Update avatar error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update seller InFo
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;
      const shop = await Shop.findOne(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler(error.message, 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;
      await shop.save();
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all seller ---- (Admin)
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//admin delete seller
router.delete(
  "/admin-delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);
      if (!seller) {
        return next(
          new ErrorHandler(`Admin is not available with this ${id}!`, 400)
        );
      }
      await Shop.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Seller Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update seller with-draw-methtods ---admin
router.put(
  `/update-payment-methods`,
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//delete seller with-draw-methtods --->Seller
router.delete(
  `/delete-withdraw-methods`,
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller?._id);
      if (!seller) {
        return next(new ErrorHandler("Seller not found with this ID", 400));
      }
      seller.withdrawMethod = null;
      await seller.save();
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
