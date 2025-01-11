const mongoose = require("mongoose");

const connectDB = async () => {
  const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

  try {
    const conn = await mongoose.connect(URI);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log("Error in MongoDB");
  }
};

module.exports = connectDB;
