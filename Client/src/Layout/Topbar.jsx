import React from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';

const Topbar = () => {
  return (
    <div className=" flex justify-between items-center border-1 border-gray-400 sticky">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

      <WebSiteLogo />

      <SearchBar />

      <SignInButton />

    </div>
  );
}

export default Topbar;
