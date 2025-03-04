'use client'
import React, { useEffect, useState } from 'react'
import { Poppins,Bebas_Neue } from 'next/font/google';
import { Menu } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import Image from 'next/image';
import kaaba from '../../public/kaaba-svgrepo-com.svg'  
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';
import EnableNotification from './EnableNotification';


const poppins = Poppins({subsets:["latin"],weight:["400","500","600","700","800","900"]})
const bebas = Bebas_Neue({subsets:["latin"],weight:["400"]})

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





const Navbar = () => {
  const [today , setToday] = useState<null | string>(null);
  const [namaz,setNamaz] = useState<PrayerTimeData | null>(null);

  useEffect(() => {
    

    const namazTime = async ()=>{
      try{
        const response = await fetch("/api/frontendtime",{
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
      }catch(error){
        console.log("error to fetch api",error)
      }
    }

    namazTime();
    todayDate();
  }, []);

  



  const todayDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if single digit
  const month = currentDate.toLocaleString('default', { month: 'long' }); // Get the month name (e.g., March)
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  // Set the formatted date (you can use this in your state)
  setToday(formattedDate);


  


  }
 
  return (
    <>
        <div className=' sticky top-1 z-50 bg-slate-400 rounded-xl'>
            <div className='flex justify-around'>
                <div className='flex items-end'>
                    <Image src={kaaba} alt='Kaaba' className='md:w-[40px] w-[30px]'></Image>
                    <h1 className={`${bebas.className} text-2xl md:text-3xl ml-1`}>BILALI MASJID</h1>
                </div>
                <div className={`${poppins.className}`}>
                    <ul className=' gap-[40px] text-lg font-[500] hidden md:flex'>
                        <li>Home</li>
                        <li>Donation</li>
                        <li><Link href={"#NamazTime"}>Namaz Time</Link></li>
                        <li>Contact</li>
                        <li><Link href={"/login"} legacyBehavior ><a target="_blank">Admin</a></Link></li>
                        <li><EnableNotification/></li>
                    </ul>
                </div >
                <div className={`${poppins.className} font-[500] flex items-center gap-2`}>
                <Dialog>
      <DialogTrigger className="bg-green-300 text-black font-semibold rounded-lg h-[40px] px-4 hover:bg-green-400 transition-all">
        Get Ramzan Time
      </DialogTrigger>
      <DialogContent className=" bg-white shadow-lg rounded-xl p-4">
        <DialogHeader>
          {/* Today's Date */}
          <DialogTitle className="text-xl text-black font-bold">{today}</DialogTitle>
          <hr className="border border-black my-2" />
          
          {/* Islamic Date */}
          <DialogTitle className="text-lg text-green-600 font-semibold">{namaz===null?"NoDate":(namaz.islamicDate)}</DialogTitle>

          <hr className="border border-black my-2" />

          {/* Sehri Time */}
          <DialogTitle className="text-lg text-red-500 font-bold">Sehri Time: {namaz===null?"NoDate":(namaz.sehriTime)}</DialogTitle>

          {/* Iftar Time */}
          <DialogTitle className="text-lg text-green-700 font-bold">Iftari Time: {namaz===null?"NoDate":(namaz.iftarTime)}</DialogTitle>

          {/* Maghrib Jamat Time */}
          <DialogTitle className="text-lg text-blue-700 font-bold">Maghrib Jamat Time: {namaz===null?"NoDate":(namaz.prayers.Maghrib.jamat)}</DialogTitle>

          <hr className="border border-black my-2" />

          {/* Sehri Dua */}
          <DialogDescription className="text-center text-red-600 font-extrabold text-xl mt-2">
            سحری کی دعا  
          </DialogDescription>
          <p className="text-center text-black font-arabic text-lg">
            وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
          </p>

          <hr className="border border-black my-2" />

          {/* Iftar Dua */}
          <DialogDescription className="text-center text-green-700 font-extrabold text-xl mt-2">
            افطار کی دعا  
          </DialogDescription>
          <p className="text-center text-black font-arabic text-lg">
          اَللّٰهُمَّ اِنِّی لَکَ صُمْتُ وَبِکَ اٰمَنْتُ وَعَلَيْکَ تَوَکَّلْتُ وَعَلٰی رِزْقِکَ اَفْطَرْتُ
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
                <div className='md:hidden'>
                <DropdownMenu>
  <DropdownMenuTrigger><Menu size={30}/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem variant='destructive'>Profile</DropdownMenuItem>
    <DropdownMenuItem>Donation</DropdownMenuItem>
    <DropdownMenuItem><Link href={"#NamazTime"}>Namaz Time</Link></DropdownMenuItem>
    <DropdownMenuItem>Contact</DropdownMenuItem>
    <DropdownMenuItem className='text-green-500'>
    <Link href={"/login"} legacyBehavior ><a target="_blank">Admin</a></Link>
    </DropdownMenuItem>
    <DropdownMenuItem><EnableNotification/></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                </div>
                </div>
                
            </div>
            <Separator className='mt-2'/>
            


        </div>
    </>
  )
}

export default Navbar
