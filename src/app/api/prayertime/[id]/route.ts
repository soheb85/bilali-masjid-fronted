import { NextRequest, NextResponse } from "next/server";
import PrayerTime from "@/models/PrayerTime";
import { connectDB } from "@/lib/mongoose";

export async function GET(
  request: NextRequest, 
  context: { params: Record<string, string> } // ✅ Fix: Using `Record<string, string>`
) {
  await connectDB();

  const id = context.params.id; // ✅ Extract `id` correctly

  try {
    const prayerTime = await PrayerTime.findById(id);
    if (!prayerTime) {
      return NextResponse.json({ message: "Prayer time not found" }, { status: 404 });
    }
    return NextResponse.json(prayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching prayer time", error }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest, 
  context: { params: Record<string, string> } // ✅ Fix: Using `Record<string, string>`
) {
  await connectDB();

  const id = context.params.id;
  const body = await request.json();

  try {
    const updatedPrayerTime = await PrayerTime.findByIdAndUpdate(id, body, { new: true });
    if (!updatedPrayerTime) {
      return NextResponse.json({ message: "Prayer time not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPrayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating prayer time", error }, { status: 500 });
  }
}
