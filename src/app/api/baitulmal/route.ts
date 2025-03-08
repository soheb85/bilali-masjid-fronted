import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import BaitulMal from "@/models/Baitulmal";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose"; // Added mongoose import

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sanitizeFilename = (name: string) => {
  return name.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '')
    .substring(0, 40);
};

const generateUniqueFilename = async (baseName: string) => {
  const sanitized = sanitizeFilename(baseName);
  const existing = await cloudinary.v2.search
    .expression(`public_id:payment/${sanitized}*`)
    .execute();
  return existing.total_count === 0 ? sanitized : `${sanitized}_${uuidv4().split('-')[0]}`;
};

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();

    // Validate required fields
    const requiredFields = ['name', 'mobile', 'amount', 'date', 'category', 'image'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate and clean mobile number
    const mobile = formData.get("mobile")?.toString()?.trim() || "";
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, message: "Valid 10-digit mobile number required" },
        { status: 400 }
      );
    }

    // Process file upload
    const file = formData.get("image") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFilename = await generateUniqueFilename(formData.get("name") as string);

    const cloudinaryResponse = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          {
            folder: "payment",
            public_id: uniqueFilename,
            resource_type: "image",
            overwrite: false,
            transformation: [{ quality: "auto:best" }]
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result);
            }
          }
        ).end(buffer);
      }
    );

    // Create database entry
    const newEntry = await BaitulMal.create({
      name: formData.get("name") as string,
      mobile: mobile,
      amount: Number(formData.get("amount")),
      date: new Date(formData.get("date") as string),
      category: formData.get("category") as string,
      imageUrl: cloudinaryResponse.secure_url,
    });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );

  } catch (error) {
    console.error("Server Error:", error);
    
    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, message: "Validation Error", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Server error"
      },
      { status: 500 }
    );
  }
}