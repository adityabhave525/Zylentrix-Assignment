import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold cursor-pointer">
                <span className="text-blue-400">Post</span>App
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/" label="Home" />
                <NavLink href="/posts" label="Posts" />
                <NavLink href="/create" label="Create" />

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-700 group"
                  >
                    <span>Logout</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                ) : (
                  <>
                    <NavLink href="/signup" label="Sign Up" />
                    <NavLink href="/login" label="Login" />
                  </>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            <MobileNavLink href="/" label="Home" />
            <MobileNavLink href="/posts" label="Posts" />
            
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left block text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <MobileNavLink href="/signup" label="Sign Up" />
                <MobileNavLink href="/login" label="Login" />
              </>
            )}
          </div>
        </div>
      </nav>
      {/* This empty div acts as a spacer to push content below the fixed navbar */}
      <div className="h-16"></div>
    </header>
  );
};

// Desktop Navigation Link
const NavLink = ({ href, label }) => (
  <a
    href={href}
    className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-700 group"
  >
    <span>{label}</span>
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </a>
);

// Mobile Navigation Link
const MobileNavLink = ({ href, label }) => (
  <a
    href={href}
    className="block text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
  >
    {label}
  </a>
);

export default Navbar;