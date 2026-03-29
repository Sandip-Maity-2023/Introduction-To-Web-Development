import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not configured");
  }

  await mongoose.connect(process.env.MONGODB_URL);
  console.log("db connected");
};
export default connectDB;
