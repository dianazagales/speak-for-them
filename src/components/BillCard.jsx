import React from 'react'
import { Link } from 'react-router-dom'
import UrgencyBadge from './UrgencyBadge'
import StatusBadge from './StatusBadge'

export default function BillCard({ bill }) {
  const { id, billNumber, title, state, shortDescription, currentStatus, urgency } = bill
  const truncated = shortDescription?.length > 120
    ? shortDescription.slice(0, 120).trim() + '…'
    : shortDescription

  return (
    <div className="card p-6 flex flex-col gap-4 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
              {billNumber}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {state === 'Federal' ? 'Federal' : `${state} State`}
            </span>
          </div>
          <h3 className="font-bold text-navy text-base leading-snug line-clamp-2 mt-2">{title}</h3>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={currentStatus} />
        <UrgencyBadge urgency={urgency} />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{truncated}</p>

      {/* CTA */}
      <Link
        to={`/bills/${id}`}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors group"
      >
        Take Action
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
