const mongoose = require("mongoose");
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


