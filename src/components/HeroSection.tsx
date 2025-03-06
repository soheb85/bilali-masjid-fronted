import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-10 md:ml-15'>
      <Image src={"/HaramImage.jpeg"} alt='Bilali masjid' width={400} height={400} className='w-[400px] h-[500px] md:w-[800px] md:h-[450px] rounded-2xl shadow-2xl px-2 md:px-0'/>
      <div className='md:w-1/2 p-4'>
        <h1 className="text-2xl font-bold">
        Bilali Masjid - Kurla East, Mumbai
        </h1>
        <p className="mt-2 text-gray-700 font-semibold">
        🕌 Bilali Masjid, located in Kurla East, Mumbai (400024), is a well-known place of worship and spiritual gathering for the local Muslim community. Named after Hazrat Bilal (RA), the beloved companion of Prophet Muhammad ﷺ and the first Mu&apos;azzin (caller to prayer) in Islam, this masjid stands as a symbol of faith, unity, and devotion.
        </p>
        <p className='mt-2 text-gray-700 font-semibold hidden md:flex'>
        It serves as a center for daily prayers, Jummah (Friday) congregational prayers, Islamic teachings, and community events, especially during the holy month of Ramadan. Many believers gather here to strengthen their connection with Allah through Namaz, Quran recitation, and spiritual discussions.
        </p>
        <div className='mt-4'>
            <h1 className='text-xl font-semibold'>Hadith About Masjid & Its Importance</h1>
            <p className='mt-2 text-gray-700 font-semibold'> <span className='font-semibold text-green-500' > 📖 Prophet Muhammad ﷺ said: </span>
&quot;Whoever builds a mosque for the sake of Allah, Allah will build for him a house in Paradise.&quot;
— (Sahih Bukhari 450, Sahih Muslim 533)</p>
            <p className='mt-2 text-gray-700 font-semibold'> <span className='font-semibold text-green-500'> 📖 Another Hadith states: </span>
&quot;The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.&quot;
— (Sahih Muslim 671)</p>
            <p className='mt-2 text-gray-700 font-semibold'>
            <span className='font-semibold text-green-500'>📖 Hazrat Bilal (RA) was the first to call the Azan (call to prayer), and the Prophet ﷺ said: </span>
&quot;Bilal calls the Azan, and what a blessed Mu&apos;azzin he is!&quot;
— (Sunan Ibn Majah 719)
            </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
