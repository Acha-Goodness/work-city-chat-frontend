import ChatContainer from '@/components/home-view/chatcontainer';
import NoChatSelected from '@/components/home-view/nochatselected';
import SideBar from '@/components/home-view/sidebar';
import React from 'react';
import { useSelector } from 'react-redux';


const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat)
  console.log("Slected: ", selectedUser);
  return (
    <div className="h-screen bg-base-200">
        <div className='flex items-center justify-center pt-20 px-4'>
            <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
                <div className='flex h-full rounded-lg overflow-hidden bg-white'>
                    <SideBar/>
                    {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;