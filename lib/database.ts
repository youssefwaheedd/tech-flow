import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) {
    return console.log("Missing MONGO_URI");
  }

  if (isConnected) {
    return console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TechFlow",
    });
    isConnected = true;
    console.log("MongoDB connection created");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
