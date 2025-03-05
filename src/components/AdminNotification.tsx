"use client";
import { useState } from "react";
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

export default function AdminNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendNotification = async () => {
    if (isClicked) return; // Prevent multiple clicks

    setIsClicked(true); // Disable further clicks
   
    await fetch("/api/push-notify", {
      method: "POST",
      body: JSON.stringify({ title, message }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Notification Sent!");

    // Reset state after 3 seconds
    setTimeout(() => {
      setIsClicked(false);
      setIsOpen(false); // Close dialog
      setTitle("");
      setMessage("");
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[300px] h-[60px] mt-4 text-2xl font-bold focus:ring-2 focus:ring-green-500 rounded-xl bg-slate-300"
        >
          Send Notification
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-500">
            Send Notification
          </DialogTitle>
          <DialogDescription>
            Fill in the title and message, then send the notification to all users.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          
          <Textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full"
          />
          
          <Button
            onClick={sendNotification}
            disabled={isClicked}
            className={`w-full text-white transition-all duration-300 ${
              isClicked 
                ? "bg-red-500 cursor-not-allowed hover:bg-red-600" 
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isClicked ? "Notification Sent" : "Send Notification"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
