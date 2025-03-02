import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace with your actual API endpoint
    const apiResponse = await fetch("https://hijri.habibur.com/api01/date/?format=json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!apiResponse.ok) {
        console.log(apiResponse)
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const data = await apiResponse.json(); // Example response: { "hijri": "16-Shaban-1442" }
    return NextResponse.json(data); // Forward the data to the frontend
  } catch (errors) {
    return NextResponse.json({ error: "Server error",errors }, { status: 500 });
  }
}