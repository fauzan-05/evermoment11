import { NextResponse } from "next/server";
import connectDB from "@backend/lib/mongodb";
import Service from "@backend/models/Service";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX HERE

    await Service.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
