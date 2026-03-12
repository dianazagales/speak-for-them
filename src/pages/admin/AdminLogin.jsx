import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'speakforthem2024'
const AUTH_KEY = 'speakforthem_admin_auth'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      navigate('/admin/cases')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🐾</div>
          <h1 className="text-2xl font-bold text-navy">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">Speak For Them — Content Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              className="input-field"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Default password: speakforthem2024
        </p>
      </div>
    </div>
  )
}
