import React from 'react';
import { RiMessage3Fill } from "react-icons/ri";

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
        <div className='max-w-md text-center space-y-6'>
            <div className='flex justify-center gap-4 mb-4'>
                <div className='relative'>
                    <div className='w-16 h-16 rounded-2xl bg-[white] flex items-center justify-center animate-bounce'>
                        <RiMessage3Fill size={80} className='text-[black]'/>
                    </div>
                </div>
            </div>
            <h2 className='text-2xl font-bold text-black'>Welcome to Work City</h2>
            <p className='text-black'>Select a converstion from the sidebar to star chating</p>
        </div>
    </div>
  )
}

export default NoChatSelected;