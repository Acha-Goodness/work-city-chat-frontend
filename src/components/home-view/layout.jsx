import { Outlet } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import NavBar from '../Nav/navbar';

const HomeLayout = () => {
  const location = useLocation();

  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <main className="flex flex-col w-full bg-[black]">
            <Outlet/>
        </main>
    </div>
  )
}

export default HomeLayout;