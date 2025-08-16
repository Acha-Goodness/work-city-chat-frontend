import { useEffect } from 'react';
import { getUsers, setSelectedUser } from '@/store/chat-slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserSecret } from "react-icons/fa6";
import profile from "../../assets/profile.png";
import { GridLoader } from 'react-spinners';
import SidebarSkeleton from './sidebarskeleton';

const SideBar = () => {
  const { users, selectedUser, isUsersLoading } = useSelector( state => state.chat);
  const { onlineUsers } = useSelector( state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
    .then( res => {
        console.log(res)
    });
  }, [dispatch]);

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-300 w-full p-5'>
            <div className='flex items-center gap-2'>
                <FaUserSecret className='size-6'/>
                <span className='font-medium hidden lg:block'>Contacts</span>
            </div>
            {/* TOD:  online filter toggle */}
        </div>
        <div className='overflow-y-auto w-full py-3'>
            { isUsersLoading ? 
                <SidebarSkeleton/>
                :
                users?.map((user) => (
                    <button 
                        key={user._id} 
                        onClick={() => dispatch(setSelectedUser(user))} 
                        className={`w-full p-3 flex items-center gap-3 hover:bg-[#eaf3ffff] transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <img
                                src={user.profilePic || profile}
                                alt={user.name}
                                className='size-12 object-cover rounded-full'    
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className='absolute bottom-0 right-0 size-3 bg-[green]-500 rounded-full ring-2 ring-zinc-900'
                                />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className='hidden lg:block text-left min-w-0'>
                            <div className='font-medium truncate'>{user.name}</div>
                            <div className='text-sm text-zinc-400'>
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))
            }
        </div>
    </aside>
  )
}

export default SideBar;