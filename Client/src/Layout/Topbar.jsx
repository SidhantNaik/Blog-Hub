import React from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center border-2 border-gray-400 sticky h-20 top-0 bg-white p-4 md:p-6 w-full">

      <WebSiteLogo className="w-1/4 md:w-auto p-1" />

      <SearchBar className="w-1/3 md:w-auto p-1" />

      <SignInButton className="w-1/5 md:w-auto p-1" />

    </div>
  );
}

export default Topbar;
