"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function MarqueeAdmin() {
  const [newMessage, setNewMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const updateMessage = async () => {
    setIsClicked(true);

    await fetch("/api/marquee", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage }),
    });

    alert("Marquee message updated!");
    setNewMessage(""); // Clear input after update
    setTimeout(() => setIsClicked(false), 1500); // Reset button after 1.5 seconds
  };

  return (
    <Card className="p-4 w-[95%] mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-red-700">Update Marquee Message</h2>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-gray-200 text-black hover:bg-gray-300">
            Edit Message
          </Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <Input
            type="text"
            placeholder="Enter new message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={updateMessage}
            className={`w-full ${isClicked ? "bg-green-600" : "bg-blue-500"} text-white hover:bg-blue-600`}
            disabled={isClicked}
          >
            {isClicked ? "Updated!" : "Update Message"}
          </Button>
        </PopoverContent>
      </Popover>
    </Card>
  );
}

