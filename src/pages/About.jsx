import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">About Speak For Them</h1>
          <p className="text-white/60 text-lg">
            A platform built to close the gap between animal suffering and political action.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        {/* Mission */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Speak For Them exists because there is a persistent gap between animal welfare incidents that deserve attention and the public's ability to effectively advocate for change. Concerned citizens know something is wrong. They just need a bridge to power.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We aggregate real animal welfare cases and pending legislation, pair them with ready-to-send email templates, and use the Google Civic Information API to connect each visitor with their specific elected representatives — at the federal, state, and local level — in seconds.
          </p>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy">How It Works</h2>
          </div>

          <div className="space-y-4">
            <HowStep
              step="1"
              title="We research and publish cases and bills"
              description="Every case on Speak For Them represents a documented situation involving real animals. Every bill is real pending legislation. Our team verifies the details and writes advocacy email templates for each."
            />
            <HowStep
              step="2"
              title="You enter your ZIP code"
              description="Using the Google Civic Information API, we instantly identify your US Senators, House Representative, and state legislators based on your ZIP code. No account required."
            />
            <HowStep
              step="3"
              title="We match you with a pre-written email"
              description="Every case and bill includes a professionally written email template, automatically personalized with your representative's name and your ZIP code. You can edit before sending."
            />
            <HowStep
              step="4"
              title="You send — it goes to their inbox"
              description="Clicking 'Send Email' opens your default email client with everything pre-filled. One click to send. Constituent contact is tracked by congressional offices — volume matters."
            />
          </div>
        </section>

        {/* What This Site Is Not */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy">Important Disclaimer</h2>
          </div>
          <div className="space-y-3 text-sm text-amber-900 leading-relaxed">
            <p>
              <strong>Speak For Them is not a legal resource.</strong> Nothing on this site constitutes legal advice, legal representation, or legal guidance of any kind. If you have a legal matter, please consult a licensed attorney.
            </p>
            <p>
              <strong>Case information is provided for advocacy purposes only.</strong> We make good-faith efforts to verify the details of each case, but we cannot guarantee the accuracy or completeness of information sourced from news reports, public records, and community submissions.
            </p>
            <p>
              <strong>We do not coordinate with, represent, or speak on behalf of any animal welfare organization, law enforcement agency, or government body.</strong> Speak For Them is an independent advocacy platform.
            </p>
            <p>
              <strong>The email templates we provide are starting points.</strong> We encourage you to personalize them and add your own voice before sending.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to make a difference?</h2>
          <p className="text-white/60 text-sm mb-6">
            Browse open cases and active bills. Find your representatives. Send an email today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cases" className="btn-primary">
              View Cases
            </Link>
            <Link to="/bills" className="btn-secondary">
              View Bills
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function HowStep({ step, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {step}
      </div>
      <div>
        <h3 className="font-semibold text-navy mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
