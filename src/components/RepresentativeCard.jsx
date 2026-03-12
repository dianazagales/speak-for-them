import React, { useState } from 'react'
import EmailComposer from './EmailComposer'

const partyColors = {
  'Democratic': 'text-blue-700 bg-blue-50 border-blue-200',
  'Democrat': 'text-blue-700 bg-blue-50 border-blue-200',
  'Republican': 'text-red-700 bg-red-50 border-red-200',
  'Independent': 'text-purple-700 bg-purple-50 border-purple-200',
  'Unknown': 'text-gray-600 bg-gray-100 border-gray-200',
}

export default function RepresentativeCard({ rep, emailSubject, emailBody }) {
  const [showComposer, setShowComposer] = useState(false)
  const partyClass = partyColors[rep.party] || partyColors['Unknown']

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {rep.photoUrl ? (
            <img
              src={rep.photoUrl}
              alt={rep.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => { e.target.onerror = null; e.target.src = '' }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-lg">
              {rep.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-navy text-sm">{rep.name}</h4>
          <p className="text-gray-500 text-xs mt-0.5 leading-snug">{rep.office}</p>
          <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${partyClass}`}>
            {rep.party}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {rep.hasEmail ? (
          <button
            onClick={() => setShowComposer(!showComposer)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {showComposer ? 'Close Email' : 'Send Email'}
          </button>
        ) : null}

        {rep.website && (
          <a
            href={rep.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-navy text-navy text-xs font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Contact via Website
          </a>
        )}
      </div>

      {/* Email Composer */}
      {showComposer && rep.hasEmail && (
        <div className="mt-4">
          <EmailComposer
            email={rep.email}
            subject={emailSubject}
            body={emailBody}
          />
        </div>
      )}
    </div>
  )
}
