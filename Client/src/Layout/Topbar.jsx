import React, { useState } from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import { IoMenu, IoClose } from "react-icons/io5";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-400">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center h-20 px-4 lg:px-6">
        <WebSiteLogo />
        <SearchBar />
        <SignInButton />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center h-16 px-4">
        <WebSiteLogo />
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-purple-600 focus:outline-none"
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-2 border-b border-gray-200">
          <SearchBar />
          <div className="flex justify-center my-4">
            <SignInButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;