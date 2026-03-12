import React from 'react'
import { Link } from 'react-router-dom'
import UrgencyBadge from './UrgencyBadge'
import StatusBadge from './StatusBadge'

const speciesIcons = {
  Dog: '🐕',
  Cat: '🐈',
  Horse: '🐎',
  Bird: '🦅',
  default: '🐾',
}

export default function CaseCard({ caseItem }) {
  const { id, title, animalName, species, location, status, urgency, shortDescription } = caseItem
  const icon = speciesIcons[species] || speciesIcons.default
  const truncated = shortDescription?.length > 120
    ? shortDescription.slice(0, 120).trim() + '…'
    : shortDescription

  return (
    <div className="card p-6 flex flex-col gap-4 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl flex-shrink-0" role="img" aria-label={species}>
            {icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base leading-snug line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{animalName}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{location?.city}, {location?.state}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={status} />
        <UrgencyBadge urgency={urgency} />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{truncated}</p>

      {/* CTA */}
      <Link
        to={`/cases/${id}`}
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
