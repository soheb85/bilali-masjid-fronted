'use client'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

const content = [
  {
    title: "Taraweeh Time 🕌",
    description1:
      "Bilali Masjid - 8:30 PM  ",
      description2:
      " Bilali Masjid - 11:00 PM  20 Days",
      description3:
      "  Madarsa 10 Days - 8:30 PM 10 Days",
      description4:
      "  ",
  },
  {
    title: "Jum'ma Time Ramzan🔔",
    description1:
      " Bilali Masjid Jamat 1 - 1:30 PM  ",
      description2:
      " Bilali Masjid Jamat 2 - 2:15 PM  ",
      description3:
      "  Madarsa 1 Jamat - 1:40 PM",
      description4:
      "  Madarsa 2 Jamat - 4:40 PM ",
  },
  {
    title: "Ramadan Iftar & Suhoor 🌙",
    description1:
      "Break your fast at the right time!",
  },
  {
    title: "Virtues of Fajr Salah ✨",
    description1:
      "The two Rakat of Fajr are better",
      description2:
      "  than the world and everything.",
  },
  {
    title: "Virtues of Fajr Salah ✨",
    description1:
      "The two Rakat of Fajr are better",
      description2:
      "  than the world and everything.",
  },
];




const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 

  return (
    <>
    <div className='bg-white flex justify-center '>
              <h1 className='text-4xl md:text-7xl font-bold my-4'>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
            </div>
    <div className="flex justify-center">
    <Carousel
    plugins={[plugin.current]} 
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
    className="w-full max-w-sm lg:max-w-[1800px]">
      <CarouselContent className="-ml-1">
        {content.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6 gap-3">
                <div>
                <h3 className="text-2xl font-bold mb-2 text-blue-600">{item.title}</h3>
                <div className="grid grid-rows-4 text-[20px] font-medium">
                <p className="text-gray-700 ">{item.description1}</p>
                <p className="text-gray-700 ">{item.description2}</p>
                <p className="text-gray-700 ">{item.description3}</p>
                <p className="text-gray-700 ">{item.description4}</p>
                </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex"/>
      <CarouselNext className="hidden md:flex" />
    </Carousel>
    </div>
   
    </>
  )
}


export default HeroCarousel
