import { useState, useEffect, useRef } from 'react';
import { RiRobot2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const Chat = () => {
  const [ chatHistory, setChatHistory ] = useState(null)
  const chatBodyRef = useRef(null)
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

            {/* CHAT BODY */}
            <div ref={chatBodyRef} >
                <div>
                    <RiRobot2Fill className='robot'/>
                    <p className='message-text'>
                        Hey there <br/> How can i help you?
                    </p>
                </div>

                {/* RENDER THE CHAT HISTORY DYNAMICALLY */}
                {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} chat={chat}/>
                ))}
            </div>

            <div>
                 <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
            </div>
        </div>
    </div>
  )
}

export default Chat