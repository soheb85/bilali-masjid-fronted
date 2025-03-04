'use server'
import { NextResponse } from "next/server";
import webpush from "web-push";
import { connectDB } from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
webpush.setVapidDetails(
  "mailto:sk9324458770@gmail.com'",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  await connectDB();
  const { title, message } = await req.json();

  const subscribers = await Subscriber.find({});
  for (const subscriber of subscribers) {
    try {
      await webpush.sendNotification(subscriber, JSON.stringify({ title, body: message }));
    } catch (error) {
      console.error("Push Notification Error:", error);
    }
  }

  return NextResponse.json({ success: true, message: "Notifications sent" });
}
