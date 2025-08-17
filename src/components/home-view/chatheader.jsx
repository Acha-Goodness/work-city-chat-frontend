import { setSelectedUser } from '@/store/chat-slice';
import React from 'react'
import profile from "../../assets/profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { GiCrossMark } from "react-icons/gi";

const ChatHeader = () => {
 const { selectedUser } = useSelector((state) => state.chat);
 const { onlineUsers } = useSelector((state) => state.auth)

 const dispatch = useDispatch();
 
  return (
    <div className='p-2.5 border-b border-[blue]'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {/* avatar */}
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || profile} alt={selectedUser.name}/>
                    </div>
                </div>

                {/* USER INFO */}
                <div>
                    <h3 className='font-medium text-black'>{selectedUser.name}</h3>
                    <p className='text-sm text-zinc-400'>
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* CLOSE BUTTON */}
            <button onClick={() => dispatch(setSelectedUser(null))}>
                <GiCrossMark className='text-[red]'/>
            </button>
        </div>
    </div>
  )
}

export default ChatHeader;