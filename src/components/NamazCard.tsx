
'use client'
import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { Separator } from './ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

type PrayerTiming = {
  azan: string;
  jamat: string;
  start: string;
  end: string;
};

type PrayerTimeData = {
  _id?: string;
  islamicDate: string;
  temperature: number;
  sehriTime: string;
  iftarTime: string;
  prayers: {
    Fajr: PrayerTiming;
    Dhuhr: PrayerTiming;
    Asr: PrayerTiming;
    Maghrib: PrayerTiming;
    Isha: PrayerTiming;
    Jumma: PrayerTiming;
  };
};


const NamazCard = () => {
    const [time, setTime] = useState(new Date());
    const [today, setToday] = useState<null | string>(null);
    const [namaz,setNamaz] = useState<PrayerTimeData | null>(null);
    const [name,setName] = useState<string>("");
    const [azan,setAzan] = useState<string>("");
    const [jamat,setJamat] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 500);
        return () => clearInterval(interval);
      }, []);
    
      const formatNumber = (num:number) => num.toString().padStart(2, '0');

      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const dayString = days[new Date().getDay()];


      const todayDate = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if single digit
      const month = currentDate.toLocaleString('default', { month: 'long' }); // Get the month name (e.g., March)
      const year = currentDate.getFullYear();
    
      const formattedDate = `${day} ${month} ${year}`;
    
      // Set the formatted date (you can use this in your state)
      setToday(formattedDate);
    
      }

      useEffect(()=>{
      
        const namazTime = async ()=>{
          try{
            const response = await fetch("/api/prayertime",{
              method:"GET",
              headers:{"Content-Type":"application/json" }
            }
            );
            if(!response.ok){
              console.log("Error to Fetch Data")
            }

            const data = await response.json();
            console.log(data[0])
            setNamaz(data[0]);

            if (data[0]) {
              const time = new Date();
              const hours = time.getHours();
              const day = time.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
      
              if (hours >= 12 && hours < 8) {
                setName("Fajr");
                setAzan(data[0].prayers.Fajr.azan);
                setJamat(data[0].prayers.Fajr.jamat);
              } else if (day === 5 && hours >= 12 && hours < 15) {
                setName("Jum'ah");
                setAzan(data[0].prayers.Jumma.azan);
                setJamat(data[0].prayers.Jumma.jamat);
              } else if (hours >= 12 && hours < 15) {
                setName("Zuhar");
                setAzan(data[0].prayers.Dhuhr.azan);
                setJamat(data[0].prayers.Dhuhr.jamat);
              } else if (hours >= 15 && hours < 18) {
                setName("Asr");
                setAzan(data[0].prayers.Asr.azan);
                setJamat(data[0].prayers.Asr.jamat);
              } else if (hours >= 18 && hours < 20) {
                setName("Maghrib");
                setAzan(data[0].prayers.Maghrib.azan);
                setJamat(data[0].prayers.Maghrib.jamat);
              } else if (hours >= 20 || hours < 4) {
                setName("Isha");
                setAzan(data[0].prayers.Isha.azan);
                setJamat(data[0].prayers.Isha.jamat);
              }
            }
          }catch(error){
            console.log("error to fetch api",error)
          }
        }

        namazTime();
        todayDate();
       },[])

       if(namaz === null){
        return (
          <div className='flex justify-center '>
            <div className="flex flex-col space-y-3">
            <Skeleton className="h-[800px] md:w-[800px] max-w-sm rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 md:w-[800px] max-w-sm" />
              <Skeleton className="h-4 md:w-[800px] max-w-sm" />
            </div>
          </div>
          </div>
        )
       }

      {/* Hard coded prayer time for the second box in namaz card */} 
      
      
  
  return (
    <div className={`${poppins.className} flex flex-col md:flex-row items-center justify-center p-4`}> 
      
      {/* Timetable Section */}
      <div className="w-full md:w-1/2 bg-black text-white p-4 md:p-6 rounded-lg shadow-lg text-center">
        <div className='grid grid-cols-3 place-items-center'>
            <Image src={"/images__29_-removebg-preview.png" } alt='masjid' height={10} width={60} className='mb-10 md:w-[100px]'/>
            <Image src={"/images (31).jpeg" } alt='masjid' height={10} width={300}/>
            <Image src={"/images__30_-removebg-preview.png" } alt='masjid' height={400} width={150} className='mt-2 md:w-[200px] md:mt-8'/>
            
        </div>
        <h1 className='text-amber-100 md:text-5xl mb-6 font-semibold text-3xl '>{today} <span className='ml-2 text-red-300'>{dayString}</span> </h1>
        <div className='grid grid-cols-2 space-x-3 md:space-x-30'>
            <div>
            <div className='flex items-center place-content-center bg-slate-800 rounded-t-2xl gap-1'>
                <h1 className='text-[45px]'>{time.getHours() >12?formatNumber(time.getHours()-12):formatNumber(time.getHours())}</h1>
                <h1 className='text-[45px]'>:{formatNumber(time.getMinutes())}</h1>
                <h1 className='text-[22px] flex mt-2'>{formatNumber(time.getSeconds())}</h1>
                <h1 className='hidden md:flex ml-2 mt-3 text-xl text-amber-200 font-semibold'>{time.getHours()>12?"PM":"AM"}</h1>
                
                
    
            </div >
            <div className='bg-slate-800 rounded-b-2xl gap-1 flex justify-around'>
            <h1 className='text-xl  ml-2 items-start'>{dayString}</h1>
            <h1 className='text-red-200'>{namaz.temperature}</h1>
            <h1 className='flex md:hidden text-xl text-amber-200 font-semibold'>{time.getHours()>12?"PM":"AM"}</h1>
            </div>

            </div>
           <div>
            <div className='flex items-center place-content-center bg-slate-800 rounded-t-2xl'>
            <h1 className='text-[45px]'>{jamat.slice(0,6)}</h1>

                
                
            </div>
            <div className='bg-slate-800 rounded-b-2xl gap-1 flex justify-around'>
            <h1 className='text-xl  ml-2 items-start'>{name}</h1>
            <h1 className='flex items-center'>{azan}</h1>
            </div>
            </div>
        </div>
        

        <div className='grid grid-cols-3'>
        <div className="mt-4 grid  gap-2 text-[20px] md:text-xl">
            <h1 className='text-xl font-[700] text-yellow-400'>Waqt</h1>
            <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Fajr :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Fajr</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
        {namaz.prayers.Fajr.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Fajr.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator/>
         <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Zuhar :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Zuhar</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Dhuhr.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Dhuhr.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator/>
         <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Asr :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Asr</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Asr.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Asr.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator/>
         <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Maghrib :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Maghrib</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Maghrib.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Maghrib.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator/>
         <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Isha :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Isha</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Isha.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Isha.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator/>
         <Dialog>
  <DialogTrigger className='bg-red-400 rounded-2xl h-[35px]'>Jum'ah :</DialogTrigger>
  <DialogContent>
    <DialogHeader>
    <DialogTitle className='text-red-600 text-2xl mb-2 tracking-wider flex justify-center md:text-4xl font-bold'>Jum'ah</DialogTitle>
    <Separator className='mb-2'/>
      <div className='grid grid-cols-2 place-items-center '>
        <div>
        <DialogTitle className='text-yellow-500'>Start Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Jumma.start}
      </DialogDescription>
        </div>
        <div>
        <DialogTitle className='text-yellow-500'>End Time</DialogTitle>
      <DialogDescription className='mt-4 text-3xl font-semibold text-slate-800 md:text-5xl'>
      {namaz.prayers.Jumma.end}
      </DialogDescription>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
         <Separator className='mb-[3.5px]'/>
        </div>
        <div className="mt-4 grid  gap-2 text-lg md:text-xl font-semibold text-blue-500 ">
            <h1 className='text-xl font-[700] text-yellow-400'>Azan</h1>
        <p><span className="">{namaz.prayers.Fajr.azan}</span></p>
        <Separator/>
          <p><span className="">{namaz.prayers.Dhuhr.azan}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Asr.azan}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Maghrib.azan}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Isha.azan}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Jumma.azan}</span></p>
          <Separator/>
        </div>
        <div className="mt-4 grid  gap-2 text-lg md:text-xl font-semibold text-green-600">
            <h1 className='text-xl font-[700] text-yellow-400'>Jammat</h1>
        <p> <span className="">{namaz.prayers.Fajr.jamat}</span></p>
        <Separator/>
          <p><span className="">{namaz.prayers.Dhuhr.jamat}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Asr.jamat}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Maghrib.jamat}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Isha.jamat}</span></p>
          <Separator/>
          <p><span className="">{namaz.prayers.Jumma.jamat}</span></p>
          <Separator/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NamazCard
