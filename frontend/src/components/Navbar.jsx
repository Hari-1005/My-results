import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center text-2xl font-bold py-4 mb-4 border-b border-b-gray-400'>
      <h1 onClick={() => navigate('/')} className='cursor-pointer'>My Results</h1>
    </div>
  )
}

export default Navbar
