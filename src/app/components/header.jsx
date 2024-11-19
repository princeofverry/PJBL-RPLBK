'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api-berita-indonesia.vercel.app/cnn/teknologi/"
        );
        setNewsData(response.data.data.posts);
      } catch (err) {
        console.error('Failed to fetch news', err);
      }
    };
    fetchNews();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = newsData.filter(news => 
      news.title.toLowerCase().includes(query.toLowerCase()) || 
      news.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, newsData]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 w-64'
              placeholder='Search...'
            />
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer' />
            
            {/* Desktop Search Results */}
            {searchResults.length > 0 && (
              <div className='absolute top-full mt-2 w-64 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto'>
                {searchResults.map((result, index) => (
                  <a 
                    key={index} 
                    href={result.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className='block px-4 py-2 hover:bg-red-50 text-sm'
                  >
                    <div className='font-semibold'>{result.title}</div>
                    <div className='text-xs text-gray-500 truncate'>{result.description}</div>
                  </a>
                ))}
              </div>
            )}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 w-full'
                placeholder='Search...'
              />
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              
              {/* Mobile Search Results */}
              {searchResults.length > 0 && (
                <div className='mt-2 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto'>
                  {searchResults.map((result, index) => (
                    <a 
                      key={index} 
                      href={result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='block px-4 py-2 hover:bg-red-50 text-sm'
                    >
                      <div className='font-semibold'>{result.title}</div>
                      <div className='text-xs text-gray-500 truncate'>{result.description}</div>
                    </a>
                  ))}
                </div>
              )}
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