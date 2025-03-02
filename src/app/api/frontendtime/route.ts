import { connectDB } from "@/lib/mongoose";
import PrayerTime from "@/models/PrayerTime";
import { NextResponse } from "next/server";



export async function POST(req:Request) {
    try{
        await connectDB();
        const body = await req.json();
        const prayerData = new PrayerTime(body);
        await prayerData.save();

        return NextResponse.json({message:"prayer time saved successfully",data:prayerData},{status:201});
    }catch(error){
        return NextResponse.json({message:"Error saving prayer Data",error},{status:500});
    }
}

// GET: Fetch All Prayer Times
export async function GET() {
    try {
        await connectDB();
      const prayerTimes = await PrayerTime.find();
      return NextResponse.json(prayerTimes, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching prayer times", error }, { status: 500 });
    }
  }