import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='mt-7'>
        <div>
            <div onClick={() => navigate('/academic-results')} className='flex flex-col justify-center items-center text-center border-none p-4 gap-3 bg-stone-100 cursor-pointer rounded shadow-sm'>
                <h1 className='text-3xl font-semibold hover:underline'>Academic Results</h1>
                <p className='text-lg text-gray-500'>check all your academic results with just one click</p>
            </div>
        </div>
    </div>
  )
}

export default Home
