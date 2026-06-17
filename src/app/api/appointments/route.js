import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment,
} from "@/lib/appointmentsStore";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    if (!process.env.MONGODB_URI) {
      const body = await req.json();
      const appointment = await createAppointment(body);

      return NextResponse.json({
        success: true,
        appointment,
      });
    }

    await connectDB();

    const body = await req.json();

    const appointment = await Appointment.create(body);

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      const appointments = await listAppointments();

      return NextResponse.json(appointments);
    }

    await connectDB();

    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PATCH(req) {
  try {
    if (!process.env.MONGODB_URI) {
      const { id, status, isRead } = await req.json();
      const appointment = await updateAppointment(id, {
        ...(status && { status }),
        ...(typeof isRead === "boolean" && { isRead }),
      });

      return NextResponse.json({
        success: true,
        appointment,
      });
    }

    await connectDB();

    const { id, status, isRead } = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(typeof isRead === "boolean" && { isRead }),
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    if (!process.env.MONGODB_URI) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      await deleteAppointment(id);

      return NextResponse.json({
        success: true,
      });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    await Appointment.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
