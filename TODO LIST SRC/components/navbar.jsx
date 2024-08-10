import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-500 text-white py-5'>
        <div className="logo">
            <span className='font-bold text-xl mx-10'>Todo-List</span>
        </div>
      <ul className="flex gap-10 text-xl mx-10">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>About</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Lists</li>
      </ul>
    </nav>
  )
}

export default navbar
