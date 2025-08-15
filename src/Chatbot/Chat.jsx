import { useState, useEffect, useRef } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const Chat = () => {
  return (
    <div>
        <button>
            <span className='material-symbols-rounded'><BiSolidMessageSquareDots className='toggle-icon'/></span>
            <span className='material-symbols-rounded'><MdOutlineClose className='toggle-icon'/></span>
        </button>
        <div>
            {/* CHAT HEADER */}
            <div className='chat-header'>
                <div className='header-info'>
                    <RiRobot2Fill className='robot'/>
                    <h2 className='logo-text'>Chatbot</h2>
                </div>
                <button onClick={() => setShowChatbot(prev => !prev)}>
                    <MdKeyboardArrowDown className='d-arrow' />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Chat