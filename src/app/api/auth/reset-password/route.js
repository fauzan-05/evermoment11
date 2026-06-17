import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req) {
  try {
    await connectDB();

    const { token, password } =
      await req.json();

    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: {
        $gt: Date.now(),
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired link",
        },
        { status: 400 }
      );
    }

    admin.password =
      await bcrypt.hash(password, 12);

    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}