"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Marquee() {
  const [message, setMessage] = useState("Loading...");
  
  // Hard-coded space value (change the number as per your requirement)
  const space = 4; // This value controls the space between words

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch("/api/marquee");
      const data = await res.json();
      setMessage(data.message);
    };

    fetchMessage();
  }, []);

  return (
    <Card className="w-[96%] mx-auto bg-gray-100 py-2 overflow-hidden rounded-lg shadow-sm">
      <div className="relative w-full overflow-hidden flex">
        <motion.div
          className="flex whitespace-nowrap text-lg font-semibold text-red-600"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            ease: "linear",
            duration: 80, // Adjust speed based on text length
            repeat: Infinity,
          }}
        >
          {/* Create infinite scrolling effect with hard-coded spacing */}
          {Array(10)
            .fill(message)
            .map((msg, index) => (
              <span key={index} className={`mr-${space * 4}`} style={{ whiteSpace: 'pre' }}>
                {msg} &nbsp; • &nbsp;
              </span>
            ))}
        </motion.div>
      </div>
    </Card>
  );
}
