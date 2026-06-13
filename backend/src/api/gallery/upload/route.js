import { NextResponse } from "next/server";
import connectDB from "@backend/lib/mongodb";
import cloudinary from "@backend/lib/cloudinary";
import Gallery from "@backend/models/Gallery";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file");

    const categorySlug =
      formData.get("categorySlug");

    const sectionSlug =
      formData.get("sectionSlug");

    const alt =
      formData.get("alt") || "";

    if (!file) {
      return NextResponse.json(
        { error: "Image required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult =
      await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "evermoment/gallery",
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            )
            .end(buffer);
        }
      );

    const image =
      await Gallery.create({
        categorySlug,
        sectionSlug,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        alt,
      });

    return NextResponse.json(image);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}
