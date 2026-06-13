// app/api/gallery/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@backend/lib/mongodb";
import cloudinary from "@backend/lib/cloudinary";
import Gallery from "@backend/models/Gallery";

export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const image =
      await Gallery.findById(id);

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(
        image.publicId
      );
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
