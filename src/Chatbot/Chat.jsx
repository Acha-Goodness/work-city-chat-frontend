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
    </div>
  )
}

export default Chat