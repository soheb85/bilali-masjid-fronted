"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the timing type
interface Timing {
  _id?: string;
  title: string;
  description: string;
}

export default function AdminPage() {
  const [timings, setTimings] = useState<Timing[]>([]);
  const [form, setForm] = useState<Timing>({ title: "", description: "" });
  const [editForm, setEditForm] = useState<Timing | null>(null);

  // Fetch timings from API
  useEffect(() => {
    fetch("/api/timing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTimings(data.data);
      })
      .catch((err) => console.error("Error fetching timings:", err));
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new timing
  const handleAdd = async () => {
    if (!form.title || !form.description) return alert("Title & Description are required!");

    const res = await fetch("/api/timing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setTimings([...timings, { ...form, _id: Math.random().toString() }]);
      setForm({ title: "", description: "" });
    } else {
      alert("Failed to add timing");
    }
  };

  // Handle update
  const handleUpdate = async () => {
    if (!editForm || !editForm._id) return;

    const res = await fetch("/api/timing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    const data = await res.json();
    if (data.success) {
      setTimings(
        timings.map((t) => (t._id === editForm._id ? editForm : t))
      );
      setEditForm(null);
    } else {
      alert("Failed to update timing");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> Manage Carousel Data</h1>

      {/* Add New Timing Form */}
      <div className="mb-4 border p-4 rounded-lg shadow-lg">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="mb-2"
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="mb-2"
        />
        <Button onClick={handleAdd} className="bg-blue-500 text-white">Add Timing</Button>
      </div>

      {/* Display Timings */}
      {timings.map((timing) => (
        <div key={timing._id} className="border p-4 rounded-lg shadow-lg mb-2 flex justify-between">
          <div>
            <h3 className="text-xl font-bold">{timing.title}</h3>
            <p className="text-gray-700">{timing.description}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setEditForm(timing)} className="bg-green-500 text-white">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-500 text-[20px]">Edit Timing</DialogTitle>
                <DialogDescription className="text-slate-800">Modify the title and description.</DialogDescription>
              </DialogHeader>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={editForm?.title || ""}
                onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })}
                className="font-semibold"
              />
              <Textarea
                name="description"
                placeholder="Description"
                value={editForm?.description || ""}
                onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                className="font-semibold"
              />
              <Button onClick={handleUpdate} className="bg-blue-500 text-white">Update</Button>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}

