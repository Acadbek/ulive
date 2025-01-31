import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Heart, PaintBucket } from 'lucide-react';

const FeedCard = () => {
  return (
    <Card className='p-4 shadow-none max-w-[600px] w-full'>
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
        <button>
          <img src="/src/assets/icones/heart.svg" alt="heart" />
        </button>
        <button>
          <img src="/src/assets/icones/bookmark.svg" alt="bookmark" />
        </button>
      </div>
    </Card>
  )
}

export default FeedCard