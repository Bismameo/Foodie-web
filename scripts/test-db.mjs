import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load .env.local manually for this script
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;

async function testConnection() {
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  console.log("Testing connection string format...");
  console.log("URI starts with:", uri.substring(0, 15) + "...");
  
  if (!uri.includes("@")) {
    if (uri.includes("localhost") || uri.includes("127.0.0.1")) {
      console.log("ℹ️ Info: You are connecting to a local MongoDB instance (no auth required).");
    } else {
      console.error("❌ ERROR: Your MONGODB_URI is missing the '@' symbol. For Atlas, it should look like: mongodb+srv://username:password@cluster...");
    }
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    // Perform a ping to verify connection
    const admin = mongoose.connection.db.admin();
    await admin.ping();
    
    console.log("✅ Successfully connected and pinged MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error("Error Message:", err.message);
    
    if (err.message.includes("ETIMEOUT") || err.message.includes("ENOTFOUND")) {
      console.log("\nPossible solutions:");
      console.log("1. Check your internet connection.");
      console.log("2. Ensure your IP address is whitelisted in MongoDB Atlas (Network Access).");
    }
    
    process.exit(1);
  }
}

testConnection();
