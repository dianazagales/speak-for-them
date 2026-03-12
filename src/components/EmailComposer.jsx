import React, { useState } from 'react'
import { buildMailtoLink } from '../utils/emailTemplate'

export default function EmailComposer({ email, subject: initialSubject, body: initialBody }) {
  const [subject, setSubject] = useState(initialSubject || '')
  const [body, setBody] = useState(initialBody || '')
  const [copied, setCopied] = useState(false)

  const mailtoLink = buildMailtoLink(email, subject, body)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${email}\nSubject: ${subject}\n\n${body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = body
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="text-xs text-gray-500 font-medium truncate">{email}</span>
      </div>

      {/* Subject */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
        />
      </div>

      {/* Body */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white resize-y"
        />
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Clicking "Send Email" will open your default email client with this message pre-filled. You can edit it before sending.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={mailtoLink}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Email
        </a>
        <button
          onClick={handleCopy}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>
      </div>
    </div>
  )
}
