import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import UrgencyBadge from '../components/UrgencyBadge'
import StatusBadge from '../components/StatusBadge'
import ZipCodeInput from '../components/ZipCodeInput'
import RepresentativeCard from '../components/RepresentativeCard'
import EmailComposer from '../components/EmailComposer'
import ShareButtons from '../components/ShareButtons'
import { fillTemplate } from '../utils/emailTemplate'

export default function BillDetail() {
  const { id } = useParams()
  const { bills, zipCode, representatives } = useAppContext()

  const bill = bills.find(b => b.id === id)
  if (!bill) return <Navigate to="/bills" replace />

  const {
    billNumber, title, state, currentStatus, urgency,
    whyItMatters, officialUrl, emailTemplate,
  } = bill

  const templateVars = {
    rep_name: 'Representative',
    user_zip: zipCode || '[your ZIP code]',
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/bills"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Bills
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge text-sm bg-accent/20 text-accent-light border border-accent/30">
              {billNumber}
            </span>
            <span className="badge text-sm bg-white/10 text-white/70 border border-white/20">
              {state === 'Federal' ? 'Federal' : `${state} State`}
            </span>
            <StatusBadge status={currentStatus} size="md" />
            <UrgencyBadge urgency={urgency} size="md" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why It Matters */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">Why This Bill Matters</h2>
              <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                {whyItMatters?.split('\n\n').map((para, i) => (
                  <p key={i}>
                    {para.split('\n').map((line, j) => (
                      <React.Fragment key={j}>
                        {line}
                        {j < para.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Official Link */}
            {officialUrl && (
              <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-navy mb-1">Official Bill Text</h3>
                  <p className="text-gray-500 text-sm">Read the full text of this bill at the official source.</p>
                </div>
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 border-2 border-navy text-navy text-sm font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  View Bill
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">Spread the Word</h2>
              <p className="text-gray-500 text-sm mb-4">
                Public awareness is one of the most powerful tools for passing legislation. Share this bill.
              </p>
              <ShareButtons title={`Support ${billNumber} — ${title}`} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-accent text-white rounded-xl p-6">
              <h2 className="text-lg font-bold mb-2">Take Action</h2>
              <p className="text-white/80 text-sm">
                Enter your ZIP code to contact your representatives about this bill.
              </p>
            </div>

            <ZipCodeInput />

            {/* Pre-written email — show even without reps loaded */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-navy mb-3">Pre-Written Email</h3>
              <p className="text-sm text-gray-500 mb-4">
                Edit and send this to any representative. Replace "Representative" with their name.
              </p>
              <EmailComposer
                email=""
                subject={emailTemplate?.subject || ''}
                body={fillTemplate(emailTemplate?.body || '', templateVars)}
              />
            </div>

            {/* Representatives */}
            {representatives && (
              <RepresentativesSection
                representatives={representatives}
                emailSubject={emailTemplate?.subject || ''}
                emailBody={emailTemplate?.body || ''}
                templateVars={templateVars}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RepresentativesSection({ representatives, emailSubject, emailBody, templateVars }) {
  const hasFederal = representatives.federal?.length > 0
  const hasState = representatives.state?.length > 0

  if (!hasFederal && !hasState) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm">No representatives found for that ZIP code.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {hasFederal && (
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Federal</h3>
          <div className="space-y-3">
            {representatives.federal.map((rep, i) => (
              <RepresentativeCard
                key={i}
                rep={rep}
                emailSubject={emailSubject}
                emailBody={fillTemplate(emailBody, { ...templateVars, rep_name: rep.name })}
              />
            ))}
          </div>
        </div>
      )}
      {hasState && (
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">State</h3>
          <div className="space-y-3">
            {representatives.state.map((rep, i) => (
              <RepresentativeCard
                key={i}
                rep={rep}
                emailSubject={emailSubject}
                emailBody={fillTemplate(emailBody, { ...templateVars, rep_name: rep.name })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
