import { useEffect } from 'react';
import { getUser } from '@/store/chat-slice';
import { useDispatch, useSelector } from 'react-redux';
import SidebarSkeleton from './sidebarskeleton';

const SideBar = () => {
  const { users, selectedUser, isUsersLoading } = useSelector( state => state.chat);
  const dispatch = useDispatch();
  
  const onlineUsers = [];

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if(isUsersLoading) return <SidebarSkeleton/>

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>

    </aside>
  )
}

export default SideBar;