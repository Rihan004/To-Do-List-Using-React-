import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-blue-600 text-white py-2'>
    <div className="logo">
      <span className='font-bold text-xl mx-8'>DailyQuest</span>
    </div>
    <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer  hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
