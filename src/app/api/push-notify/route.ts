'use server'
import { NextResponse } from "next/server";
import webpush from "web-push";
import { connectDB } from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";

function sanitizeVapidKey(key: string): string {
  return key.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

webpush.setVapidDetails(
  "mailto:sk9324458770@gmail.com", // Fixed email format
  sanitizeVapidKey(process.env.VAPID_PUBLIC_KEY as string),
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, message } = await req.json();

    // Fetching subscribers from the database
    const subscribers = await Subscriber.find({});

    // Sending notifications to each subscriber
    for (const subscriber of subscribers) {
      try {
        await webpush.sendNotification(subscriber, JSON.stringify({ title, body: message }));
      } catch (error) {
        console.error("Push Notification Error:", error);
      }
    }

    return NextResponse.json({ success: true, message: "Notifications sent" });
  } catch (error) {
    console.error("Error in sending notifications:", error);
    return NextResponse.json({ success: false, message: "Failed to send notifications" });
  }
}

