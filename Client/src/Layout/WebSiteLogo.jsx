import React from 'react';
import { FaGithubAlt } from 'react-icons/fa';

export default function WebSiteLogo() {
  return (
    <a href="/" className="flex items-center">
      <span className="px-3 py-2 rounded-sm bg-purple-50 hover:scale-105 transition-transform hover:shadow-md flex items-center"> 
        <FaGithubAlt className="mr-2 text-purple-700" />
        <span className="font-medium text-purple-700">Blog Hub</span>
      </span>
    </a>
  )
}