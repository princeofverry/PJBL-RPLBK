import { Search } from 'lucide-react'
import React from 'react'
import wartech from '/public/wartech.png'

const Header = () => {
  return (
      <>
          <div className='text-black flex flex-row justify-between p-8 bg-red-500'>
              <div>
                  <h1 className='text-white font-semibold'>Wartech</h1>
              </div>
              <div className='relative'>
                  <input className='rounded px-1' placeholder='Search...'/>
                  <Search className='absolute inset-y-0 right-3 flex items-center text-gray-400'/>
              </div>
        </div>
      </>
  )
}

export default Header