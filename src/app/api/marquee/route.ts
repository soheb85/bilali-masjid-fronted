import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Marquee } from "@/models/Marquee";

export async function GET() {
    await connectDB();
    const message = await Marquee.findOne();
    return NextResponse.json({ message: message?.message || "Welcome to our website!" });
  }

  export async function PUT(req: Request) {
    await connectDB();
    const { message } = await req.json();
  
    let marquee = await Marquee.findOne();
    if (!marquee) {
      marquee = new Marquee({ message });
    } else {
      marquee.message = message;
    }
  
    await marquee.save();
    return NextResponse.json({ success: true, message: "Message updated successfully!" });
  }