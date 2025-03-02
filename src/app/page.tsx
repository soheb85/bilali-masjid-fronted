import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import NamazCard from "@/components/NamazCard";
import Navbar from "@/components/Navbar";


export default function Home() {
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
