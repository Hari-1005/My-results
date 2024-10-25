import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AcademicResults from './pages/AcademicResults'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[5%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/academic-results' element={<AcademicResults/>}/>
      </Routes>
    </div>
  )
}

export default App
