import { useState } from 'react';
import { MdCamera } from "react-icons/md";
import { FaDrupal } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoMdMail } from "react-icons/io";

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const [ isUpdatingProfile, setIsUpdating ] = useState(false);
  const handleImageUpload = async(e) => {

  }

  return (
    <div className='h-screen pt-20'>
        <div className='max-w-2xl mx-auto p-4 py-8'>
            <div className='bg-[grey] rounded-xl p-6 space-y-8'>
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold'>Profile</h1>
                    <p className='mt-2'>Your profile information</p>
                </div>
                {/* AVATAR UPLOAD SECTION */}
                <div className='flex flex-col items-center gap-4'>
                    <div className='relative'>
                        <img src={user.profilePic || <FaDrupal />} alt="profile" className='size-32 rounded-full object-cover border-4'/>
                        <label
                            htmlFor="avatar-upload"
                            className='absolute bottom-0 right-0 bg-[grey] hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200'
                        >
                            <MdCamera className='w-5 h-5 text-[blue]'/>
                            <input type="file" id="avatar-upload" className='hidden' accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile}/>
                        </label>
                    </div>
                    <p className='text-sm text-black-400'>
                        {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                    </p>
                </div>
                <div className='space-y-6'>
                    <div className='space-y-1.5'>
                        <div className='text-sm text-zinc-400 flex items-center gap-2'>
                            <FaDrupal className='w-4 h-4'/>
                            Full Name
                        </div>
                        <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{user?.name}</p>
                    </div>
                    <div className='space-y-1.5'>
                        <div className='text-sm text-zinc-400 flex items-center gap-2'>
                            <IoMdMail className='w-4 h-4'/>
                            Email Address
                        </div>
                        <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{user?.email}</p>
                    </div>
                </div>
                <div className='mt-6 bg-base-300 rounded-xl p-6'>
                    <h2 className='text-lg font-medium mb-4'>Account Information</h2>
                    <div className='space-y-3 text-sm'>
                        <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                            <span></span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile;