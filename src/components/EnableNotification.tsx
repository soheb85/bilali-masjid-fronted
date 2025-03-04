"use client";
import { useEffect, useState } from "react";

 
function urlBase64ToUint8Array(base64String: string) {
  // Ensure the key is URL-safe before decoding
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64) // Decoding base64 string to raw data
  const outputArray = new Uint8Array(rawData.length)

  // Convert the decoded data into a Uint8Array
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

export default function EnableNotification() {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(reg => {
        console.log("Service Worker Registered:", reg);
      });
    }
  }, []);

  async function subscribeToPush() {
    const NEXT_PUBLIC_VAPID_KEY = process.env.VAPID_PUBLIC_KEY as string;
    if (!NEXT_PUBLIC_VAPID_KEY) {
      alert("VAPID_PUBLIC_KEY is missing!");
      return;
    }
  
    // Ensure the key is in the correct URL-safe format
    const urlSafeVapidKey = NEXT_PUBLIC_VAPID_KEY.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return alert("Notification permission denied");
  
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(urlSafeVapidKey), // Pass URL-safe VAPID key
    });

    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: { "Content-Type": "application/json" },
    });

    setSubscribed(true);
    alert("Push Notifications Enabled!");
  }

  return (
    <button onClick={subscribeToPush} className="bg-blue-500 text-white px-4 py-2 rounded-xl">
      {subscribed ? "Notifications Enabled" : "Enable Notifications"}
    </button>
  );
}
