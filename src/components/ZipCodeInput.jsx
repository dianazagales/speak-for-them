import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { getRepresentatives } from '../utils/civicAPI'

export default function ZipCodeInput({ onSuccess }) {
  const { zipCode, setZipCode, setRepresentatives } = useAppContext()
  const [inputVal, setInputVal] = useState(zipCode || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const zip = inputVal.trim()

    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid 5-digit ZIP code.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const reps = await getRepresentatives(zip)
      setZipCode(zip)
      setRepresentatives(reps)
      if (onSuccess) onSuccess(reps)
    } catch (err) {
      if (err.message.includes('API key not configured')) {
        setError(
          'The Google Civic API key is not configured. To enable representative lookup, add your VITE_GOOGLE_CIVIC_API_KEY to the .env file.'
        )
      } else {
        setError(err.message || 'Failed to fetch representatives. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-navy/5 border border-navy/10 rounded-xl p-6">
      <h3 className="font-bold text-navy text-lg mb-1">Find Your Representatives</h3>
      <p className="text-gray-500 text-sm mb-4">
        Enter your ZIP code to find your federal and state representatives and send them a pre-written email.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value.replace(/\D/g, '').slice(0, 5))
            setError(null)
          }}
          placeholder="Enter ZIP code"
          className="input-field sm:max-w-[180px]"
          aria-label="ZIP code"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Looking up…
            </span>
          ) : (
            'Find My Representatives'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {zipCode && !error && !loading && (
        <p className="mt-3 text-sm text-gray-500">
          Showing representatives for ZIP code <strong>{zipCode}</strong>.{' '}
          <button
            type="button"
            onClick={() => {
              setInputVal('')
              setZipCode('')
              setRepresentatives(null)
            }}
            className="text-accent hover:text-accent-dark underline"
          >
            Change
          </button>
        </p>
      )}
    </div>
  )
}
