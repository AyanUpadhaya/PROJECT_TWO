const mongoose = require("mongoose");
const connection_string = process.env.MOGO_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
