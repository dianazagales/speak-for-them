import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import UrgencyBadge from '../components/UrgencyBadge'
import StatusBadge from '../components/StatusBadge'
import ZipCodeInput from '../components/ZipCodeInput'
import RepresentativeCard from '../components/RepresentativeCard'
import ShareButtons from '../components/ShareButtons'
import { fillTemplate } from '../utils/emailTemplate'
import { buildMailtoLink } from '../utils/emailTemplate'

export default function CaseDetail() {
  const { id } = useParams()
  const { cases, zipCode, representatives } = useAppContext()

  const caseItem = cases.find(c => c.id === id)
  if (!caseItem) return <Navigate to="/cases" replace />

  const {
    title, animalName, species, location, status, urgency,
    fullDescription, timeline, photoUrl, localPolice,
    localAnimalControl, emailTemplate,
  } = caseItem

  const templateVars = {
    rep_name: 'Representative',
    case_name: animalName,
    user_zip: zipCode || '[your ZIP code]',
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/cases"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cases
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={status} size="md" />
            <UrgencyBadge urgency={urgency} size="md" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location?.city}, {location?.state}
            </span>
            <span>{species}</span>
            <span>{animalName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo */}
            {photoUrl && (
              <div className="rounded-xl overflow-hidden">
                <img src={photoUrl} alt={title} className="w-full h-64 object-cover" />
              </div>
            )}

            {/* Full Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">About This Case</h2>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
                {fullDescription?.split('\n\n').map((para, i) => (
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

            {/* Timeline */}
            {timeline?.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-6">Timeline</h2>
                <div className="relative">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {timeline.map((item, i) => (
                      <div key={i} className="flex gap-4 relative">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent border-2 border-white shadow-sm mt-0.5 z-10" />
                        <div>
                          <div className="text-xs font-semibold text-gray-400 mb-0.5">
                            {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          <div className="text-sm text-navy font-medium">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">Spread the Word</h2>
              <p className="text-gray-500 text-sm mb-4">
                More public pressure means more accountability. Share this case.
              </p>
              <ShareButtons title={`Help ${animalName} — ${title}`} />
            </div>
          </div>

          {/* Sidebar — Take Action */}
          <div className="space-y-6">
            <div className="bg-accent text-white rounded-xl p-6">
              <h2 className="text-lg font-bold mb-2">Take Action</h2>
              <p className="text-white/80 text-sm">
                Your representatives need to hear from you. Enter your ZIP code to find who to contact.
              </p>
            </div>

            {/* Zip input */}
            <ZipCodeInput />

            {/* Representatives */}
            {representatives && (
              <RepresentativesSection
                representatives={representatives}
                emailSubject={emailTemplate?.subject || ''}
                emailBody={emailTemplate?.body || ''}
                templateVars={templateVars}
              />
            )}

            {/* Local Contacts */}
            <LocalContactsCard
              localPolice={localPolice}
              localAnimalControl={localAnimalControl}
              emailTemplate={emailTemplate}
              templateVars={templateVars}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function RepresentativesSection({ representatives, emailSubject, emailBody, templateVars }) {
  const allReps = [
    ...(representatives.federal || []),
    ...(representatives.state || []),
  ]

  if (allReps.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm">No representatives found for that ZIP code.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {representatives.federal?.length > 0 && (
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
      {representatives.state?.length > 0 && (
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

function LocalContactsCard({ localPolice, localAnimalControl, emailTemplate, templateVars }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-navy mb-4">Local Contacts</h3>
      <p className="text-xs text-gray-500 mb-4">
        Contact local agencies directly to report and escalate this situation.
      </p>

      <div className="space-y-4">
        {localAnimalControl && (
          <ContactItem
            label="Animal Control"
            contact={localAnimalControl}
            emailTemplate={emailTemplate}
            templateVars={templateVars}
          />
        )}
        {localPolice && (
          <ContactItem
            label="Sheriff / Police"
            contact={localPolice}
            emailTemplate={emailTemplate}
            templateVars={templateVars}
          />
        )}
      </div>
    </div>
  )
}

function ContactItem({ label, contact, emailTemplate, templateVars }) {
  const subject = emailTemplate?.subject || ''
  const body = fillTemplate(emailTemplate?.body || '', { ...templateVars, rep_name: contact.name })
  const mailtoLink = contact.email ? buildMailtoLink(contact.email, subject, body) : null

  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="font-semibold text-navy text-sm mb-2">{contact.name}</div>
      <div className="space-y-1">
        {contact.phone && (
          <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-navy transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {contact.phone}
          </a>
        )}
        {mailtoLink && (
          <a href={mailtoLink} className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-dark transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </a>
        )}
      </div>
    </div>
  )
}
