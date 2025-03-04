'use client'
import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import NamazCard from "@/components/NamazCard";
import Navbar from "@/components/Navbar";

import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(reg => console.log("Service Worker Registered", reg))
        .catch(err => console.error("Service Worker Registration Failed", err));
    }
  }, []);

  return (
    <>
  
    
    <Navbar/>
    
    <div className="mt-2">
      <HeroCarousel/>
    </div>
    <div className="mt-2">
      <HeroSection/>
    </div>
    <div>
      <NamazCard/>
    </div>
    </>
  );
}
