import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Timing from "@/models/Timing";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

// 🟢 GET: Fetch all timings
export async function GET() {
  try {
    await connectDB();
    const timings = await Timing.find();
    return NextResponse.json({ success: true, data: timings });
  } catch (errors) {
    return NextResponse.json({ success: false, error: "Failed to fetch data",errors }, { status: 500 });
  }
}

// 🟢 POST: Add a new timing card
export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ success: false, error: "Title and description are required" }, { status: 400 });
    }

    const newTiming = new Timing({ title, description });
    await newTiming.save();

    return NextResponse.json({ success: true, message: "Timing added successfully" });
  } catch (errors) {
    return NextResponse.json({ success: false, error: "Failed to add timing",errors }, { status: 500 });
  }
}

// 🟢 PUT: Update an existing timing card
export async function PUT(req: Request) {
  try {
    await connectDB();
    const { _id, title, description } = await req.json();

    if (!_id || !title || !description) {
      return NextResponse.json({ success: false, error: "ID, title, and description are required" }, { status: 400 });
    }

    await Timing.findByIdAndUpdate(_id, { title, description });

    return NextResponse.json({ success: true, message: "Timing updated successfully" });
  } catch (errors) {
    return NextResponse.json({ success: false, error: "Failed to update timing",errors }, { status: 500 });
  }
}
