import { NextResponse } from "next/server";
import connectDB from "@backend/lib/mongodb";
import Service from "@backend/models/Service";

export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const service =
      await Service.findOne({
        slug,
      }).lean();

    if (!service) {
      return NextResponse.json(
        {
          error: "Not Found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      ...service,
      _id: service._id.toString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch service",
      },
      {
        status: 500,
      }
    );
  }
}
