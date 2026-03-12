import React from 'react'

const urgencyConfig = {
  High: {
    label: 'High Urgency',
    className: 'bg-accent/10 text-accent border border-accent/20',
    dot: 'bg-accent',
  },
  Medium: {
    label: 'Medium',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
  },
  Low: {
    label: 'Low',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
}

export default function UrgencyBadge({ urgency, size = 'sm' }) {
  const config = urgencyConfig[urgency] || urgencyConfig.Low
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <span className={`badge ${textSize} ${config.className} gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} inline-block`} />
      {config.label}
    </span>
  )
}
