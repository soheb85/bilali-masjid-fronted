'use client'
import AdminPage from '@/components/AdminPage';
import CarouselData from '@/components/CarouselData';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNotification from '@/components/AdminNotification';
import MarqueeAdmin from '@/components/MarqueeAdmin';

const Admin = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");

    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Render nothing if not authenticated
  }

  return(
    <>
   <AdminPage />
   <div className='mb-10 mt-5 ml-10'>
    <AdminNotification/>
   </div>
   <div>
    <MarqueeAdmin/>
   </div>
   <div className='mt-4'>
    <CarouselData/>
   </div>
   
   </>
  )
};

export default Admin;

