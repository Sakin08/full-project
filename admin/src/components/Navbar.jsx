import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-300 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={assets.admin_logo} alt="" className="h-10 w-auto" />
        <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full shadow-sm">
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
