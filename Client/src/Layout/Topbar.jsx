import React, { useState } from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import { IoMenu, IoClose } from "react-icons/io5";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  return (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-400">
      <div className="flex justify-between items-center h-16 md:h-20 px-4 lg:px-6">
        <WebSiteLogo />
        
        {/* SearchBar - visible on desktop, hidden on mobile */}
        <div className="hidden md:block flex-grow mx-4">
          <SearchBar />
        </div>
        
        {/* SignInButton - visible on desktop, hidden on mobile */}
        <div className="hidden md:block">
          <SignInButton />
        </div>
        
        {/* Menu toggle - visible on mobile only */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-600 focus:outline-none"
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 border-t border-gray-200 animate-fadeIn">
          <SearchBar />
          <div className="flex justify-center my-4">
            <SignInButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;