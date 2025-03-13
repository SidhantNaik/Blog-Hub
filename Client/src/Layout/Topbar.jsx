import React from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';

const Topbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 fixed top-0 left-0 w-full bg-white shadow-md z-10 transition-shadow hover:shadow-lg md:items-start">

      <WebSiteLogo />

      <SearchBar />

      <SignInButton />

    </div>
  );
}

export default Topbar;
