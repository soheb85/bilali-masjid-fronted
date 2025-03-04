"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";

interface Timing {
  _id?: string;
  title: string;
  description: string;
}

const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [content, setContent] = useState<Timing[]>([]);

  
  // 🟢 Fetch timings from API
  useEffect(() => {
    fetch("/api/timing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContent(data.data);
      })
      .catch((err) => console.error("Error fetching timings:", err));
  }, []);

  return (
    <>
      <div className="bg-white flex justify-center ">
        <h1 className="text-4xl md:text-7xl font-bold my-4">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>
      </div>
      <div className="flex justify-center">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full max-w-sm lg:max-w-[1800px]"
        >
          <CarouselContent className="-ml-1">
            {content.length > 0 ? (
              content.map((item, index: number) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="flex aspect-video items-center justify-center p-4">
                        <div className="w-full">
                          <h3 className="text-2xl font-bold mb-2 text-blue-600">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 text-[19px] font-medium h-[120px] overflow-auto whitespace-pre-line">
                            {item.description.includes("   ")
                              ? item.description
                                  .split("   ")
                                  .map((line, index) => (
                                    <React.Fragment key={index}>
                                      {line}
                                      <br />
                                    </React.Fragment>
                                  ))
                              : item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <LoaderPage/>
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </>
  );
};

export default HeroCarousel;
