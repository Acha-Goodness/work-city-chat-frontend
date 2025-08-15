import { useState, useEffect, useRef } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const Chat = () => {
  const [ chatHistory, setChatHistory ] = useState(null);
  const [ showChatBot, setShowChatbot ] = useState(false);
  const chatBodyRef = useRef(null)
  return (
    <div className={`${showChatBot && ""}`}>
        <button className='fixed bottom-[30px] right-[35px] border-none h-[50px] w-[50px] flex cursor-pointer rounded-[50px] bg-[#2f91db] items-center justify-center transition-all duration-200 ease-in-out' onClick={() => setShowChatbot(prev => !prev)}>
            <span className='material-symbols-rounded'><BiSolidMessageSquareDots className='text-[30px]'/></span>
            <span className='material-symbols-rounded'><MdOutlineClose className='text-[30px]'/></span>
        </button>
        <div className='fixed opacity-0 cursor-none bottom-[90px] right-[35px] w-[420px] overflow-hidden bg-[#fff] rounded-[15px] z-[50] scale-[0.2] origin-bottom-right shadow-[0_0_128px_rgba(0,0,0,0.1),_0_32px_64px_-48px_rgba(0,0,0,0.5)] transition-all duration-100 [transition-timing-function:ease]'>
            {/* CHAT HEADER */}
            <div className='flex py-[15px] px-[22px] items-center justify-between bg-gradient-to-r from-[#6b24fb] to-[#2f91db]'>
                <div className='flex gap-[10px] items-center'>
                    <RiRobot2Fill className='text-[#ffffff] text-[30px]'/>
                    <h2 className='text-[#ffffff] text-[1.31rem] font-[600]'>Chatbot</h2>
                </div>
                <button className='h-[40px] w-[40px] py-0 px-[5px] border-none outline-none cursor-pointer text-[1.9rem] pt-[2px] mr-[-10px] bg-none rounded-[50%] transition-all duration-200 [transition-timing-function:ease] hover:bg-[#56a8e7]' onClick={() => setShowChatbot(prev => !prev)}>
                    <MdKeyboardArrowDown className='h-[35px] w-[35px] p-[6px] bg-[#ffffff] rounded-[50%] shrink-0 fill-[#6D4FC2]' />
                </button>
            </div>

            {/* CHAT BODY */}
            <div ref={chatBodyRef} className='flex flex-col gap-[20px] h-[460px] mb-[82px] overflow-y-auto py-[25px] px-[22px] scrollbar-thin scrollbar-thumb-[#DDD3F9] scrollbar-track-transparent'>
                <div className="flex gap-[11px] items-center bot-message">
                    <RiRobot2Fill className='text-[#6b24fb]'/>
                    <p className='py-[12px] px-[16px] text-[0.9hrem] max-w-[75%] break-words whitespace-pre-line'>
                        Hey there <br/> How can i help you?
                    </p>
                </div>

                {/* RENDER THE CHAT HISTORY DYNAMICALLY */}
                {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} chat={chat}/>
                ))}
            </div>

            <div className='absolute bottom-[0] w-[100%] bg-[#ffffff] pt-[15px] px-[22px] pb-[20px]'>
                 <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
            </div>
        </div>
    </div>
  )
}

export default Chat;