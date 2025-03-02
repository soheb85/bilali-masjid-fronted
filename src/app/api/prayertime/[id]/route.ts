import { NextRequest, NextResponse } from "next/server";
import PrayerTime from "@/models/PrayerTime";
import { connectDB } from "@/lib/mongoose";

// ✅ Ensure the function arguments follow Next.js 14+ API route structure
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } } // ✅ Fix: Destructure `params` directly
) {
  await connectDB();

  const { id } = params; // ✅ Extract `id` correctly

  try {
    const prayerTime = await PrayerTime.findById(id);

    if (!prayerTime) {
      return NextResponse.json(
        { message: "Prayer time not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching prayer time", error },
      { status: 500 }
    );
  }
}

// ✅ PUT request to update a single prayer time by ID
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } } // ✅ Fix: Destructure `params` directly
) {
  await connectDB();

  const { id } = params; // ✅ Use `params.id`
  const body = await request.json(); // ✅ Get request body

  try {
    const updatedPrayerTime = await PrayerTime.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedPrayerTime) {
      return NextResponse.json(
        { message: "Prayer time not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPrayerTime, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating prayer time", error },
      { status: 500 }
    );
  }
}