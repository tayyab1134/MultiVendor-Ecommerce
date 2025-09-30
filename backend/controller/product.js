const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const upload = require("../multer");
const Order = require("../model/order");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("../cloudinary");

// create product

router.post(
  "/create-product",
  upload.array("images", 6), // max 6 images
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) return next(new ErrorHandler("Shop Id is invalid", 400));

      const files = req.files;
      if (!files || files.length === 0)
        return next(new ErrorHandler("Please upload at least one image", 400));

      // Helper function to upload a single file to Cloudinary
      const uploadToCloudinary = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "product_images" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(fileBuffer);
        });
      };

      // Upload all images
      const imageUrls = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file.buffer);
        imageUrls.push(url);
      }

      // Prepare product data
      const productData = {
        ...req.body,
        images: imageUrls,
        shop: shop._id,
        shop: shop,
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Create product error:", error);
      return next(
        new ErrorHandler(error.message || "Internal Server Error", 500)
      );
    }
  })
);
// get all products of a shop

router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",

  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      if (!productData) {
        return next(new ErrorHandler("Product not found with this id!", 404));
      }

      //  Check both `image` and `images` field (depends on schema)
      const images = productData.image || productData.images;

      if (images && images.length > 0) {
        for (const imageUrl of images) {
          const filePath = `uploads/${imageUrl}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); //  delete image from uploads
          }
        }
      }

      //  Delete product from DB
      await Product.findByIdAndDelete(productId);

      res.status(200).json({
        success: true,
        message: "Product and images deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all products of all shops

router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//review for a Product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const isReviwed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );
      const review = {
        user,
        rating,
        comment,
        productId,
      };
      if (isReviwed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }
      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        {
          arrayFilters: [{ "elem._id": productId }],
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed Successfuly!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all products ---- (Admin)
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
