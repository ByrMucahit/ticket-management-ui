'use client'
import { useEffect, useState } from 'react'
import Form from '@/src/component/form'
import { TravelResponseI } from '@/src/services/interfaces'
import { findTravelById } from '@/src/services/travels'
import { ThemeProvider } from '@material-tailwind/react'
import { usePathname } from 'next/navigation'


export default  function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [travel, setTravel] = useState<TravelResponseI | undefined>(undefined);
  const pathname = usePathname()
   const postId = pathname.split('/').pop() || ''
  useEffect(() => {
     const fetchData = async () => {
          const response: TravelResponseI | undefined = await findTravelById(postId);
          setTravel(response);
        };
        fetchData();
  }, [postId]);
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-blue-gray-50/50">
        <div className="p-4 xl:ml-80">
          <Form data={travel}/>
        </div>
      </div>
    </ThemeProvider>
  )
}
