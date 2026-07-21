import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import NewReceipt from './pages/NewReceipt'
import Admin from './pages/Admin'
import Loader from './components/Loader'

function App() {
  const token = localStorage.getItem('token')
  return (
    <div style={{ fontFamily: 'Gelasio' }} className='bg-linear-to-br from-orange-50 via-amber-100 to-orange-200'>
      <Routes>
        <Route path='/' element={<Loader />} />
        <Route path='/login' element={<Login />} />
        {token ? (
          <>
            <Route path="/generate-receipt" element={<NewReceipt />} />
            <Route path="/admin" element={<Admin />} />
          </>
        ) : (
          <>
            <Route path="/generate-receipt" element={<Navigate to="/login" replace />} />
            <Route path="/admin" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App