const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
// Middleware

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://multi-vendor-frontend-indol.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Serve static files from /uploads via /uploads path
app.use("/uploads", express.static("uploads"));

//for deployment
app.get("/test", (req, res) => {
  res.send("Backend is running 🚀");
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
} //if (process.env.NODE_ENV !== "PRODUCTION") {
//require("dotenv").config({ path: "config/.env" })
//}

//Import Routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

//Mount Routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// Global Error Handling Middleware
app.use(ErrorHandler);

module.exports = app;
