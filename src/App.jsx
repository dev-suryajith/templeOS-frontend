import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import NewReceipt from './pages/NewReceipt'
import Admin from './pages/Admin'
import Loader from './components/Loader'

function App() {
  return (
    <div style={{ fontFamily: 'Gelasio' }} className='bg-linear-to-br from-orange-50 via-amber-100 to-orange-200'>
      <Routes>
        <Route path='/' element={<Loader />} />
        <Route path='/login' element={<Login />} />
        <Route path='/generate-receipt' element={<NewReceipt />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App