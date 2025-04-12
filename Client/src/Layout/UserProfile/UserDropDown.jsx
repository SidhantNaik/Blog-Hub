import React, { forwardRef } from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { FaRegUser,FaPlus } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import {useDispatch} from 'react-redux'
import { getEnv } from '../../Helpers/getEnv'
import { showToast } from '../../Helpers/showToast'
import { removeUser } from '../../redux/user/user.slice';
import { useNavigate } from 'react-router-dom'
import { RouteIndex } from '../../Helpers/RouteNames'






const UserDropDown = forwardRef(({ avatar, name, email, onClose }, ref) => {

  const dispath = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => { 
    try {
      const response=await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method:'post',
        credentials:'include',
      })

      const data = await response.json()
      if(!response.ok)
      {
         return showToast('error',data.message)
      }

      dispath(removeUser(data.user))
      navigate(RouteIndex)
      showToast('success',data.message)

  }
  catch (error) {
    showToast('error',error.message)
  }
  }

  return (
    <div 
      ref={ref}
      className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
    >
      <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="flex items-center gap-3">
          <Avatar src={avatar} alt={name} />
          <div className="overflow-hidden">
            <p className="font-semibold text-gray-800 truncate">{name}</p>
            <p className="text-sm text-gray-600 truncate">{email}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          <FaRegUser className="text-gray-600" />
          <span>Profile</span>
        </Link>

        <Link 
          to="/create-blog" 
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          <FaPlus className="text-gray-600" />
          <span>Create Blog</span>
        </Link>
      </div>

      <div className="border-t border-gray-200 py-2">
          <div 
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors w-full text-left"
          >
            <IoLogOutOutline className="text-red-600" />
            <button onClick={handleLogout}>Logout</button>
          </div>
      </div>
    </div>
  );
});

export default UserDropDown;