import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Heart, PaintBucket } from 'lucide-react';

const FeedCard = () => {
  return (
    <Card className='p-4 shadow-none'>
      <div className='cursor-pointer flex items-start gap-2'>
        <img width={50} height="50" src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' />
        <div>
          <p className='font-medium text-[20px] text-slate-600'>Gulchapchap</p>
          <div className='flex items-center gap-2 text-gray-500 text-[12px]'>
            <time dateTime="12.12.12">12.12.12</time>
            <address className='not-italic'>Location</address>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-2xl mt-4 mb-2 cursor-pointer'>Rest in Peace David Lynch</h2>
        <p className='flex items-center gap-2 text-blue-600'>
          <span className='cursor-pointer'>#cinema</span>
          <span className='cursor-pointer'>#film</span>
          <span className='cursor-pointer'>#movies</span>
        </p>
        <img className='cursor-pointer w-full rounded-xl object-cover h-[400px] mt-2' src="/src/assets/images/post2.jpg" alt="" />
      </div>
      <div className='flex justify-between items-center mt-4'>
        <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M11.98 19.094q-.291 0-.577-.106q-.286-.105-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.094 0 2.279.553T12 6.289q1.037-1.533 2.221-2.086T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 2.529-2.125 4.862t-4.652 4.622l-1.142 1.031q-.218.218-.513.323t-.587.106m-.47-11.767q-.898-1.448-1.867-2.063Q8.675 4.65 7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 1.108.627 2.272q.627 1.165 1.684 2.386q1.056 1.22 2.429 2.498q1.371 1.277 2.856 2.629q.173.154.404.154t.404-.154q1.485-1.352 2.857-2.63q1.372-1.276 2.429-2.497q1.056-1.222 1.683-2.386T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.144.615q-.97.614-1.867 2.062q-.08.135-.214.202T12 7.596t-.275-.067t-.213-.202M12 11.398" /></svg>
        <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M18.437 20.948H5.563a2.37 2.37 0 0 1-2.5-2.21v-11a2.37 2.37 0 0 1 2.5-2.211h.462a.5.5 0 0 1 0 1h-.462a1.38 1.38 0 0 0-1.5 1.211v11a1.38 1.38 0 0 0 1.5 1.21h12.874a1.38 1.38 0 0 0 1.5-1.21v-11a1.38 1.38 0 0 0-1.5-1.211h-.462a.5.5 0 0 1 0-1h.462a2.37 2.37 0 0 1 2.5 2.211v11a2.37 2.37 0 0 1-2.5 2.21" /><path fill="currentColor" d="m15.355 10.592l-3 3a.5.5 0 0 1-.35.15a.5.5 0 0 1-.36-.15l-3-3a.5.5 0 0 1 .71-.71l2.14 2.139V3.552a.51.51 0 0 1 .5-.5a.5.5 0 0 1 .5.5v8.49l2.15-2.16a.5.5 0 0 1 .71.71" /></svg>
      </div>
    </Card>
  )
}

export default FeedCard