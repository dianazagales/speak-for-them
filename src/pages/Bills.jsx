import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import BillCard from '../components/BillCard'

const URGENCY_OPTIONS = ['All', 'High', 'Medium', 'Low']
const STATUS_OPTIONS = ['All', 'In Committee', 'Passed Committee', 'Floor Vote', 'Signed into Law', 'Failed']
const SCOPE_OPTIONS = ['All', 'Federal', 'State']

export default function Bills() {
  const { bills } = useAppContext()
  const [urgencyFilter, setUrgencyFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [scopeFilter, setScopeFilter] = useState('All')

  const activeBills = bills
    .filter(b => b.active)
    .filter(b => urgencyFilter === 'All' || b.urgency === urgencyFilter)
    .filter(b => statusFilter === 'All' || b.currentStatus === statusFilter)
    .filter(b => {
      if (scopeFilter === 'All') return true
      if (scopeFilter === 'Federal') return b.state === 'Federal'
      if (scopeFilter === 'State') return b.state !== 'Federal'
      return true
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="min-h-screen bg-cream">
      {/* Page Header */}
      <div className="bg-navy py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/40 text-sm font-semibold uppercase tracking-wider">Legislation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Active Bills</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            These bills need constituent voices. Contact your representatives to push them forward — or prevent harmful ones.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">Scope:</span>
              {SCOPE_OPTIONS.map(opt => (
                <FilterButton key={opt} label={opt} active={scopeFilter === opt} onClick={() => setScopeFilter(opt)} />
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">Urgency:</span>
              {URGENCY_OPTIONS.map(opt => (
                <FilterButton key={opt} label={opt} active={urgencyFilter === opt} onClick={() => setUrgencyFilter(opt)} />
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">Status:</span>
              {STATUS_OPTIONS.map(opt => (
                <FilterButton key={opt} label={opt} active={statusFilter === opt} onClick={() => setStatusFilter(opt)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bills Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {activeBills.length === 0 ? (
          <EmptyState
            onClear={() => { setUrgencyFilter('All'); setStatusFilter('All'); setScopeFilter('All') }}
            hasFilters={urgencyFilter !== 'All' || statusFilter !== 'All' || scopeFilter !== 'All'}
          />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <strong>{activeBills.length}</strong> bill{activeBills.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBills.map(b => <BillCard key={b.id} bill={b} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
        active
          ? 'bg-navy text-white border-navy'
          : 'bg-white text-gray-600 border-gray-300 hover:border-navy hover:text-navy'
      }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">📋</div>
      <h3 className="text-xl font-bold text-navy mb-2">No bills found</h3>
      <p className="text-gray-500 mb-6">
        {hasFilters ? 'No bills match the selected filters.' : 'No active bills at this time.'}
      </p>
      {hasFilters && (
        <button onClick={onClear} className="btn-outline">
          Clear Filters
        </button>
      )}
    </div>
  )
}
