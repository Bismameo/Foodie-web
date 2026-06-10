import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import User from "../../../model/user-model";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found with this email" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiry (1 hour)
    const resetPasswordExpire = new Date(Date.now() + 3600000);

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // In a real app, you would send an email with this link:
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password/${resetToken}`;
    
    console.log(`Password reset URL: ${resetUrl}`);

    return NextResponse.json({ 
      message: "Reset link generated (simulated)",
      resetUrl: resetUrl // Returning it for demonstration purposes in this project
    }, { status: 200 });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
