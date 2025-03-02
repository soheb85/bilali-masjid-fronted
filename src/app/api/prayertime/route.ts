import { NextRequest, NextResponse } from "next/server";
import PrayerTime from "@/models/PrayerTime";
import { connectDB } from "@/lib/mongoose";

// ✅ PUT request: Update the first available prayer time
export async function PUT(request: NextRequest) {
  await connectDB();
  const body = await request.json(); // ✅ Get request body

  try {
    const updatedPrayerTime = await PrayerTime.findOneAndUpdate({}, body, { new: true });
    
    if (!updatedPrayerTime) {
      return NextResponse.json({ message: "No prayer time found to update" }, { status: 404 });
    }

    return NextResponse.json(updatedPrayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating prayer time", error }, { status: 500 });
  }
}