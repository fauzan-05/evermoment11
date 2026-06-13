import { NextResponse } from "next/server";
import connectDB from "@backend/lib/mongodb";
import Service from "@backend/models/Service";

export async function GET() {
  try {
    await connectDB();

    const services = await Service.find().lean();

    const formattedServices = services.map(
      (service) => ({
        ...service,
        _id: service._id.toString(),
      })
    );

    return NextResponse.json(
      formattedServices
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch services",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const service =
      await Service.create(body);

    return NextResponse.json(
      {
        ...service.toObject(),
        _id:
          service._id.toString(),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create service",
      },
      {
        status: 500,
      }
    );
  }
}
