/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type PrayerTimes = {
  azan: string;
  jamat: string;
  start: string;
  end: string;
};

type FormData = {
  islamicDate: string;
  temperature: string;
  sehriTime: string;
  iftarTime: string;
  prayers: {
    Fajr: PrayerTimes;
    Dhuhr: PrayerTimes;
    Asr: PrayerTimes;
    Maghrib: PrayerTimes;
    Isha: PrayerTimes;
    Jumma: PrayerTimes;
  };
};

const AdminPage = () => {
  const [formData, setFormData] = useState<FormData>({
    islamicDate: "",
    temperature: "",
    sehriTime: "",
    iftarTime: "",
    prayers: {
      Fajr: { azan: "", jamat: "", start: "", end: "" },
      Dhuhr: { azan: "", jamat: "", start: "", end: "" },
      Asr: { azan: "", jamat: "", start: "", end: "" },
      Maghrib: { azan: "", jamat: "", start: "", end: "" },
      Isha: { azan: "", jamat: "", start: "", end: "" },
      Jumma: { azan: "", jamat: "", start: "", end: "" },
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login"); // If not logged in, redirect to login page
    } else {
      // Fetch existing prayer data if logged in
      const fetchData = async () => {
        const response = await fetch(`/api/prayertime/67c38487c4c177b5dcdd5ae3`);
        if (!response.ok) {
          console.error("Error fetching prayer data");
          return;
        }
        const data = await response.json();
        setFormData(data);
      };
      fetchData();
    }
  }, [router]);
  // Handle input changes
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement>,
    prayerName?: keyof FormData["prayers"],
    field?: keyof PrayerTimes) => {
    const { name, value } = e.target;
    if (prayerName) {
      setFormData((prev) => ({
        ...prev,
        prayers: {
          ...prev.prayers,
          [prayerName]: {
            ...prev.prayers[prayerName],
            [field as string]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Confirmation Alert
    const confirmUpdate = window.confirm("Are you sure you want to update prayer times?");
    if (!confirmUpdate) return;

    setLoading(true);

    const response = await fetch(`/api/prayertime/67c38487c4c177b5dcdd5ae3`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Failed to update prayer times. Please try again.");
      console.error("Failed to update prayer times");
      return;
    }

    alert("Prayer times updated successfully!");
    console.log("Prayer times updated successfully");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Prayer Timings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* General Fields */}
        <label className="block">
          Islamic Date:
          <input type="text" name="islamicDate" value={formData.islamicDate}
            onChange={handleChange} className="border p-2 w-full rounded" />
        </label>
        <label className="block">
          Temperature:
          <input type="number" name="temperature" value={formData.temperature}
            onChange={handleChange} className="border p-2 w-full rounded" />
        </label>
        <label className="block">
          Sehri Time:
          <input type="text" name="sehriTime" value={formData.sehriTime}
            onChange={handleChange} className="border p-2 w-full rounded" />
        </label>
        <label className="block">
          Iftar Time:
          <input type="text" name="iftarTime" value={formData.iftarTime}
            onChange={handleChange} className="border p-2 w-full rounded" />
        </label>

        {/* Prayer Timings */}
        {Object.keys(formData.prayers).map((prayer) => (
          <div key={prayer} className="border p-4 rounded bg-white">
            <h3 className="text-lg font-semibold mb-2">{prayer} Prayer</h3>
            {["azan", "jamat", "start", "end"].map((field) => (
              <label key={field} className="block">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input type="text" 
                value={formData.prayers[prayer as keyof FormData["prayers"]][field as keyof PrayerTimes]}
                onChange={(e) => handleChange(e, prayer as keyof FormData["prayers"], field as keyof PrayerTimes)}
                className="border p-2 w-full rounded" />
              </label>
            ))}
          </div>
        ))}

        <button 
          type="submit" 
          className={`p-2 rounded text-white transition-all duration-300
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Prayer Timings"}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;

