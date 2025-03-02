import { NextRequest, NextResponse } from "next/server";
import PrayerTime from "@/models/PrayerTime";
import { connectDB } from "@/lib/mongoose";

// Define the GET handler for this dynamic route
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    await connectDB();
  
    const {id}= params; // ✅ This is the correct way to get `id`
  
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


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    const {id} = params;

    try {
        const body = await req.json(); // Get the updated data from request body

        const updatedPrayerTime = await PrayerTime.findByIdAndUpdate(id, body, { 
            new: true, // Return the updated document
            runValidators: true 
        });

        if (!updatedPrayerTime) {
            return NextResponse.json({ message: "Prayer time not found" }, { status: 404 });
        }

        return NextResponse.json(updatedPrayerTime, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error updating prayer time", error }, { status: 500 });
    }
}
