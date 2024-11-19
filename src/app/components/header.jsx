import { Search } from 'lucide-react';
import React from 'react';
import Image from 'next/image'; // Import yang benar dari next/image

const Header = () => {
  return (
    <div className='bg-gradient-to-r from-red-600 to-red-700 shadow-md'>
      <div className='container mx-auto flex justify-between items-center p-4'>
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
        <div className='relative'>
          <input
            className='rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 w-64'
            placeholder='Search...'
          />
          <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>
      </div>
    </div>
  );
};

export default Header;