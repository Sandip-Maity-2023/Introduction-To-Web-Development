import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(process.env.MONGODB_URL){
    throw new Error("MONGODB_URL is not defined in .env file");

}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;













