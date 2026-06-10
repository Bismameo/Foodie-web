import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import User from "../../../model/user-model";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    await connectDB();

    // Hash the token from URL to compare with DB
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
