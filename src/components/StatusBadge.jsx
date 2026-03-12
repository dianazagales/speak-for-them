import React from 'react'

const statusConfig = {
  'Needs Investigation': {
    className: 'bg-red-50 text-red-700 border border-red-200',
  },
  'Charges Pending': {
    className: 'bg-orange-50 text-orange-700 border border-orange-200',
  },
  'Awaiting Prosecution': {
    className: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  'Resolved': {
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  'In Committee': {
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  'Passed Committee': {
    className: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  },
  'Floor Vote': {
    className: 'bg-purple-50 text-purple-700 border border-purple-200',
  },
  'Signed into Law': {
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  'Failed': {
    className: 'bg-gray-100 text-gray-600 border border-gray-200',
  },
}

export default function StatusBadge({ status, size = 'sm' }) {
  const config = statusConfig[status] || { className: 'bg-gray-100 text-gray-600 border border-gray-200' }
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <span className={`badge ${textSize} ${config.className}`}>
      {status}
    </span>
  )
}
