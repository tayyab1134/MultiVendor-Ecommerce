/*const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(" Mongo Connected!");
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

module.exports = dbConnection;
*/
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    console.log("MongoDB URL:", process.env.MONGODB_URL); // Debug log
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connected!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = dbConnection;
