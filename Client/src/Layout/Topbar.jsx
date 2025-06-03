import  { useState, useEffect, useRef } from 'react';
import WebSiteLogo from './WebSiteLogo';
import SearchBar from './SearchBar';
import SignInButton from './SignInButton';
import { IoMenu, IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import UserDropDown from './UserProfile/UserDropDown';
import Avatar from './UserProfile/Avatar';

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showUserDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center h-16 md:h-20 px-4 lg:px-6">
        <WebSiteLogo />

        {/* SearchBar - visible on desktop, hidden on mobile */}
        <div className="hidden md:block flex-grow mx-4">
          <SearchBar />
        </div>

        {/* User controls - visible on desktop */}
        <div className="hidden md:flex items-center gap-4">
              {!user.isLoggedIn ? (
                <SignInButton />
              ) : (
                <div className="relative">
                  <button
                    ref={avatarBtnRef}
                    onClick={toggleUserDropdown}
                    className="focus:outline-none rounded-full focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="User menu"
                    aria-expanded={showUserDropdown}
                    aria-haspopup="true"
                  >
                    <Avatar src={user.user?.avatar} alt={user.user?.name || ''} />
                  </button>

                  {showUserDropdown && (
                    <UserDropDown
                      ref={dropdownRef}
                      avatar={user.user?.avatar}
                      name={user.user?.name}
                      email={user.user?.email}
                      onClose={() => setShowUserDropdown(false)}
                    />
                  )}
                </div>
              )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 border-t border-gray-200 animate-fadeIn">
          <SearchBar />
          <div className="flex justify-center my-4">
            {!user.isLoggedIn ? (
              <SignInButton />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={toggleUserDropdown}
                  className="focus:outline-none"
                  aria-label="User menu"
                >
                  <Avatar src={user.user?.avatar} alt={user.user?.name || ''} size="lg" />
                </button>
                <span className="font-medium">{user.user?.name || ''}</span>

                {showUserDropdown && (
                  <UserDropDown
                    ref={dropdownRef}
                    avatar={user.user?.avatar}
                    name={user.user?.name}
                    email={user.user?.email}
                    onClose={() => setShowUserDropdown(false)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;