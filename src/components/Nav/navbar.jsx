import { logout } from '@/store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa6";
import { RiMessage3Fill } from "react-icons/ri";

const NavBar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full bg-black text-white'>
        <div className='container mx-auto px-4 h-16'>
            <div className='flex items-center justify-between h-full'>
                <div className='flex items-center gap-8'>
                    <Link to="/chat/home" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                        <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                            <RiMessage3Fill className="w-5 h-5 text-primary"/>
                        </div>
                        <h1 className='text-lg font-bold'>Work City</h1>
                    </Link>
                </div>
                <div className='flex items-center gap-2'>
                    <Link to="/settings">
                        <IoIosSettings className='w-4 h-4'/>
                        {/* <span className='hidden sm:inline'>Settings</span> */}
                    </Link>
                    {user && (
                        <>
                            <Link to="/chat/profile" className='btn btn-sm gap-2'>
                                <FaUserSecret className='size-5'/>
                                {/* <span className='hidden sm:inline'>Profile</span> */}
                            </Link>
                            <button className='flex gap-2 items-center' onClick={handleLogout}>
                                <MdOutlinePowerSettingsNew className='size-5' />
                                {/* <span className='hidden sm:inline'>Logout</span>2 */}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default NavBar;