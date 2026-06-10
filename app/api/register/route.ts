import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import User from "../../../model/user-model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("Registration attempt started...");
    const body = await req.json();
    console.log("Request body received:", { ...body, password: "[REDACTED]" });
    
    const { name, email, password } = body;

    if (!name || !email || !password) {
      console.log("Validation failed: Missing fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      console.log("Validation failed: Password too short");
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: Invalid email format");
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB Connected.");

    // Check if user already exists
    console.log("Checking if user exists...");
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed successfully.");

    // Create user
    console.log("Creating user in DB...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully:", user._id);

    return NextResponse.json({ message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error: any) {
    console.error("CRITICAL REGISTRATION ERROR:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
