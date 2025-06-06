import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4">
      {
        aToken &&
        <ul className="flex flex-col gap-4">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-6 h-6" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-6 h-6" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
