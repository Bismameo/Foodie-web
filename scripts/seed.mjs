import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { products } from "../data/products.js";

// Load .env or .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

const uri = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

async function seed() {
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const productsToInsert = products.map(({ id, ...rest }) => rest);
    await Product.insertMany(productsToInsert);
    console.log(`Successfully seeded ${productsToInsert.length} products`);

    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
