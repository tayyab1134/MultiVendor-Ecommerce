const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const express = require("express");
const router = express.Router();
const upload = require("../multer");
const cloudinary = require("cloudinary").v2;

//  Create new message
router.post(
  "/create-new-message",
  catchAsyncError(async (req, res, next) => {
    try {
      const { sender, text, conversationId, images } = req.body;
      let myCloud;

      if (images) {
        myCloud = await cloudinary.uploader.upload(images, {
          folder: "messages",
        });
      }
      const message = new Messages({
        conversationId,
        text: text ? text : undefined,
        sender,
        images: images
          ? {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            }
          : undefined,
      });

      await message.save();
      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//  Get all messages by conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
