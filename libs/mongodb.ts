import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

console.log("Database connection attempt...");
console.log("URI Protocol:", MONGODB_URI.split("://")[0]);
console.log("URI Host:", MONGODB_URI.split("@")[1] || "(No credentials/host correctly parsed)");

/** 
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 10000, // 10 seconds timeout
    };

    console.log("Connecting to MongoDB URI:", MONGODB_URI.split("@")[1] || "URI provided");

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected Successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB Connection Error:", err.message);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};