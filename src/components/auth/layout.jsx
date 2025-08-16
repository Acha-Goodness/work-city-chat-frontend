import React from 'react';
import { Outlet } from 'react-router-dom';
import logoo from "../../assets/logoo.png";

const layout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className='hidden lg:flex items-center justify-center bg-white w-1/2 px-12'>
            <div className='max-w-md space-y-6 text-center text-primary-foreground'>
                <img src={logoo} alt="logo"/>
            </div>
        </div>
        <div className='flex flex-1 items-center justify-center bg-[#5F2780] px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
    </div>
  );
}

export default layout;
