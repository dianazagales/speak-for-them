import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import CaseCard from '../components/CaseCard'
import BillCard from '../components/BillCard'

export default function Home() {
  const { cases, bills } = useAppContext()

  const recentCases = cases
    .filter(c => c.active)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  const recentBills = bills
    .filter(b => b.active)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/[0.02]" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/[0.08]" />
          <PawPattern />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent-light text-sm font-semibold rounded-full mb-6 border border-accent/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {recentCases.length} active case{recentCases.length !== 1 ? 's' : ''} need your voice
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Animals Can't Speak.
            <br />
            <span className="text-accent">You Can.</span>
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Find your representatives in seconds and demand action on animal cruelty cases and legislation happening right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cases" className="btn-primary text-base px-8 py-4 shadow-lg shadow-accent/30">
              See Urgent Cases
            </Link>
            <Link to="/bills" className="btn-secondary text-base px-8 py-4">
              View Active Bills
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-white">{cases.filter(c => c.active).length}</div>
              <div className="text-xs text-white/50 mt-1 font-medium">Active Cases</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl font-black text-white">{bills.filter(b => b.active).length}</div>
              <div className="text-xs text-white/50 mt-1 font-medium">Active Bills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">50</div>
              <div className="text-xs text-white/50 mt-1 font-medium">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three steps to make your voice count</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Enter Your ZIP Code"
              description="We'll look up exactly who represents you — your US Senators, House Representative, and state legislators."
            />
            <StepCard
              number="2"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="See Who to Contact"
              description="Get a direct list of your elected officials with contact information — no digging through government websites required."
            />
            <StepCard
              number="3"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Send a Pre-Written Email"
              description="Every case and bill includes a professionally crafted email template, personalized with your rep's name and your ZIP. One click to send."
            />
          </div>
        </div>
      </section>

      {/* Urgent Cases */}
      {recentCases.length > 0 && (
        <section className="bg-cream py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Urgent</span>
                </div>
                <h2 className="section-title mb-0">Active Cases</h2>
              </div>
              <Link
                to="/cases"
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
              >
                View All Cases
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCases.map(c => <CaseCard key={c.id} caseItem={c} />)}
            </div>
          </div>
        </section>
      )}

      {/* Active Bills */}
      {recentBills.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-navy/40 text-sm font-semibold uppercase tracking-wider">Legislation</span>
                </div>
                <h2 className="section-title mb-0">Bills Needing Your Voice</h2>
              </div>
              <Link
                to="/bills"
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-dark font-semibold text-sm transition-colors"
              >
                View All Bills
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBills.map(b => <BillCard key={b.id} bill={b} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Band */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Every email matters.
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Elected officials track constituent contact. A surge of emails on a specific case can genuinely change what they prioritize.
          </p>
          <Link to="/cases" className="btn-primary text-base px-10 py-4">
            Start Speaking For Them
          </Link>
        </div>
      </section>
    </div>
  )
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="relative flex flex-col items-center text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-5">
        {icon}
      </div>
      <div className="absolute top-8 right-8 text-5xl font-black text-gray-100 select-none">{number}</div>
      <h3 className="font-bold text-navy text-lg mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function PawPattern() {
  return (
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C9.8 2 8 3.8 8 6s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-6 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm12 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM4.5 13C2.6 13 1 14.6 1 16.5S2.6 20 4.5 20s3.5-1.6 3.5-3.5S6.4 13 4.5 13zm15 0c-1.9 0-3.5 1.6-3.5 3.5S17.6 20 19.5 20s3.5-1.6 3.5-3.5S21.4 13 19.5 13zm-7.5 1c-3.3 0-6 2.7-6 6 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0-3.3-2.7-6-6-6z'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
  )
}
