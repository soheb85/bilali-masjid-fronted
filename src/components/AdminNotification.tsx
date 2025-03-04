"use client";
import { useState } from "react";

export default function AdminNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    await fetch("/api/push-notify", {
      method: "POST",
      body: JSON.stringify({ title, message }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Notification Sent!");
  };

  return (
    <div className="p-4 border">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <button onClick={sendNotification} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Send Notification
      </button>
    </div>
  );
}
