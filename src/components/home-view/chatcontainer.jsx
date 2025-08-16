import { getMessages } from '@/store/chat-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './chatheader';
import MessageInput from './messageinput';
import MessageSkeleton from './messageskeleton';

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getMessages(selectedUser._id))
  }, [dispatch]);


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      {
        isMessagesLoading ? 
        (
          <>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
          </>
        ) 
        : 
        (
          <>
            <ChatHeader/>
            <p>messages...</p>
            <MessageInput/>
          </>
        )
      }
     
    </div>
  )
}

export default ChatContainer;