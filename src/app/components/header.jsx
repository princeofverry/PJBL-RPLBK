'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Gadget', href: '/' },
    { name: 'Gaming', href: '/' },
    { name: 'Software', href: '/' },
    { name: 'Internet', href: '/' },
    { name: 'Sains', href: '/' },
  ];

  return (
    <header className='bg-gradient-to-r from-red-600 to-red-700 shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        {/* Desktop Layout */}
        <div className='flex justify-between items-center h-16'>
          {/* Logo Section */}
          <div className='flex items-center gap-2'>
            {/* <Image 
              src="/wartech.png" 
              alt="Wartech Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            /> */}
            <h1 className='text-white text-2xl font-bold'>Wartech📰</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-6'>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-white hover:text-red-200 transition-colors duration-200'
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className='hidden md:block relative'>
            <input
              className='rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 w-64'
              placeholder='Search...'
            />
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer' />
          </div>

          {/* Mobile Menu and Search Toggles */}
          <div className='flex items-center gap-4 md:hidden'>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className='text-white p-2'
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white p-2'
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className='md:hidden py-4'>
            <div className='relative'>
              <input
                className='rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 w-full'
                placeholder='Search...'
              />
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className='md:hidden py-4 border-t border-red-500'>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='block py-2 text-white hover:bg-red-600 px-4 rounded transition-colors duration-200'
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;