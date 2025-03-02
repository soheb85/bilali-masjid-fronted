import { NextResponse } from "next/server";
import PrayerTime from "@/models/PrayerTime";
import { connectDB } from "@/lib/mongoose";

export async function GET() {
  await connectDB();

  try {
    const prayerTime = await PrayerTime.findOne(); // ✅ Fetch first available record
    if (!prayerTime) {
      return NextResponse.json({ message: "No prayer time found" }, { status: 404 });
    }
    return NextResponse.json(prayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching prayer time", error }, { status: 500 });
  }
}