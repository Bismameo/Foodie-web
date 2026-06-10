import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import Product from "../../../model/product-model";
import { products } from "../../../data/products";

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing products to ensure new ones are added
    await Product.deleteMany({});
    
    // Insert products (excluding the 'id' field from static data as MongoDB generates _id)
    const productsToInsert = products.map(({ id, ...rest }) => rest);
    await Product.insertMany(productsToInsert);

    return NextResponse.json({ message: "Seeded successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
