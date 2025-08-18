import { getMessages, subscribeToMessages, unsubscribeFromMessages } from '@/store/chat-slice';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './chatheader';
import MessageInput from './messageinput';
import MessageSkeleton from './messageskeleton';
import profile from "../../assets/profile.png"
import { formatMessageTime } from '@/lib/utils';

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth)
  const messageEndRef = useRef(null);

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getMessages(selectedUser._id));
    dispatch(subscribeToMessages());

    return () => dispatch(unsubscribeFromMessages());
  }, [selectedUser._id, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  },[messages])


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
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {
                messages.map((message, idx) => (
                  <div 
                    key={idx}
                    className={`chat ${message.senderId === user.user._id ? "chat-end" : "chat-start"}`}
                    ref={messageEndRef}
                  >
                    <div className='chat-image avatar'>
                      <div className='size-10 rounded-full border'>
                          <img
                            src={message.senderId === user.user._id ? user.user.profilePic || profile : selectedUser.profilePic || profile}
                            alt='profil pic'
                          />
                      </div>
                    </div>
                    <div className='chat-header mb-1'>
                      <time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
                    </div>
                    <div className='chat-bubble flex flex-col'>
                        {
                          message.image && (
                            <img
                              src={message.image}
                              alt="Attachment"
                              className='sm:max-w-[200px] rounded-md mb-2'
                            />
                          )
                        }
                        {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                ))}
            </div>
            <MessageInput/>
          </>
        )
      }
     
    </div>
  )
}

export default ChatContainer;