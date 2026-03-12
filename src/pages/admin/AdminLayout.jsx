import React from 'react'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'

const AUTH_KEY = 'speakforthem_admin_auth'

export default function AdminLayout() {
  const navigate = useNavigate()
  const isAuthed = sessionStorage.getItem(AUTH_KEY) === 'true'

  if (!isAuthed) {
    return <Navigate to="/admin" replace />
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    navigate('/admin')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-accent text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
    }`

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <div className="text-sm font-bold text-navy">Speak For Them</div>
          <div className="text-xs text-gray-400 mt-0.5">Admin Panel</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin/cases" className={linkClass}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Cases
          </NavLink>
          <NavLink to="/admin/bills" className={linkClass}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Bills
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
