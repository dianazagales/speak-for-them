import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.8 2 8 3.8 8 6s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-6 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm12 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM4.5 13C2.6 13 1 14.6 1 16.5S2.6 20 4.5 20s3.5-1.6 3.5-3.5S6.4 13 4.5 13zm15 0c-1.9 0-3.5 1.6-3.5 3.5S17.6 20 19.5 20s3.5-1.6 3.5-3.5S21.4 13 19.5 13zm-7.5 1c-3.3 0-6 2.7-6 6 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0-3.3-2.7-6-6-6z" />
              </svg>
              <span className="font-bold text-lg">Speak For Them</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Animal Welfare Advocacy — connecting concerned citizens with their elected representatives to create real change for animals.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cases" className="text-white/70 hover:text-white text-sm transition-colors">
                  Active Cases
                </Link>
              </li>
              <li>
                <Link to="/bills" className="text-white/70 hover:text-white text-sm transition-colors">
                  Legislation
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Disclaimer</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Speak For Them is an advocacy platform only. Nothing on this site constitutes legal advice. All case information is provided for advocacy purposes. Always verify details through official sources.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Speak For Them. Not legal advice — advocacy only.
          </p>
          <p className="text-white/40 text-xs">
            Built to give animals a voice.
          </p>
        </div>
      </div>
    </footer>
  )
}
