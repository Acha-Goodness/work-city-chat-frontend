import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from "../../assets/logo.png";

const layout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className='hidden lg:flex items-center justify-center bg-white w-1/2 px-12'>
            <div className='max-w-md space-y-6 text-center text-primary-foreground animate-bounce'>
                <img src={logo} alt="logo" className='w-[500px]'/>
            </div>
        </div>
        <div className='flex flex-1 items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
    </div>
  );
}

export default layout;
