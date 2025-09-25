const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const upload = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");

router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      }

      const files = req.files;
      if (!files || files.length === 0) {
        return next(new ErrorHandler("Please upload at least one image", 400));
      }

      // Save all file names into images array
      const imageUrls = files.map((file) => file.filename);

      const eventData = req.body;
      eventData.images = imageUrls; // ✅ match schema
      eventData.shop = shop;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message || error, 400));
    }
  })
);

// get all events of a shop

router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const eventData = await Event.findById(eventId);

      eventData.images.forEach((imageUrls) => {
        const filename = imageUrls;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      const event = await Event.findByIdAndDelete(eventId);
      if (!event) {
        return next(new ErrorHandler("Event not found with this id!", 500));
      }
      res.status(201).json({
        success: true,
        message: "Event Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all events of all shops

router.get(
  "/get-all-events",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find();

      res.json({
        success: true,
        events,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all Events ---- (Admin)
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
