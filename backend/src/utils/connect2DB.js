import mongoose from "mongoose";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

export const connect2DB = asyncHandler(async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "finstergram-live",
    });
    console.log("MongoDB connected");
});
