import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found",
        },
        { status: 404 }
      );
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    admin.resetToken = token;
    admin.resetTokenExpiry =
      Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetUrl =
      `${process.env.NEXT_PUBLIC_SITE_URL}` +
      `/admin/reset-password?token=${token}`;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Ever Moment Password Reset",
      html: `
        <h2>Password Reset</h2>

        <p>Click below:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>Valid for 15 minutes.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Reset email sent",
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