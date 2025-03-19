import React from 'react';
import {MdLogin} from "react-icons/md"
import { Link } from 'react-router-dom';

function SignInButton() {
  return (
    <button className="bg-purple-500 text-white p-2 px-4 m-2 rounded-2xl hover:cursor-pointer hover:scale-110 hover:bg-purple-600 hover:shadow-black hover:shadow-2xl"> 

      <Link to="" className='flex'>
        Sign In
        &nbsp; &nbsp; <big><MdLogin/></big>
      </Link>
    </button>
  );
}

export default SignInButton;
