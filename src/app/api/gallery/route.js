import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const category =
    searchParams.get("category");

  const query = {};

  if (category) {
    query.categorySlug = category;
  }

  const images = await Gallery.find({
    ...query,
    imageUrl: {
      $nin: ["", null],
    },
  }).sort({
    createdAt: -1,
  });

  return NextResponse.json(images);
}