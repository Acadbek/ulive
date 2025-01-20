import React from 'react'
// /src/assets/images/post2.jpg

type ICardProps = {
  img: string,
  isSavedCard: boolean,
  followCard: boolean
}

const ICard = ({ img, isSavedCard, followCard = true }: ICardProps) => {
  return (
    <div className="h-[220px] rounded-lg font-semibold">
      <img src={img} className='absolute rounded-lg h-[220px] w-[275px] object-cover z-[-1] opacity-50' alt="" />
      {followCard === true
        ?
        <div className='h-full gap-3 flex flex-col items-center justify-center'>
          <img className='w-[55px] h-[55px] rounded-full' src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Wayfarers&hairColor=BlondeGolden&facialHairType=Blank&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Heather&eyeType=Wink&eyebrowType=Angry&mouthType=Twinkle&skinColor=Yellow' />
          <p>name</p>
          <p>@username</p>
          <button>Follow</button>
        </div>
        : <div className='flex h-full items-end justify-between p-2 gap-3'>
          <div className='flex items-end'>
            <img className='w-[35px] h-[35px] object-cover' src='https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Prescription01&hatColor=Red&facialHairType=MoustacheFancy&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Brown' />
            <h3 title='John Doe John Doe John Doe' className='font-semibold dark:text-white text-sm text-black/70 line-clamp-1'>John Doe John Doe John Doe</h3>
          </div>
          {!isSavedCard &&
            <div className='flex items-center gap-3'>
              <button className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125" /></svg>
                <span className='text-sm'>123</span>
              </button>
              <button className='w-[20px] h-[20px]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z" /></svg>
              </button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default ICard