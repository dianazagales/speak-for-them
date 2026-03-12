import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? 'text-accent-light' : 'text-white/80 hover:text-white'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-navy transition-shadow duration-200 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
          >
            <PawIcon className="w-7 h-7 text-accent" />
            <span>Speak For Them</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/cases" className={navLinkClass}>Cases</NavLink>
            <NavLink to="/bills" className={navLinkClass}>Bills</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <Link
              to="/cases"
              className="ml-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors duration-150"
            >
              Take Action
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white hover:text-accent-light transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-light border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            <NavLink
              to="/cases"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Cases
            </NavLink>
            <NavLink
              to="/bills"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Bills
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <Link
              to="/cases"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors duration-150 text-center"
            >
              Take Action
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function PawIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C9.8 2 8 3.8 8 6s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-6 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm12 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM4.5 13C2.6 13 1 14.6 1 16.5S2.6 20 4.5 20s3.5-1.6 3.5-3.5S6.4 13 4.5 13zm15 0c-1.9 0-3.5 1.6-3.5 3.5S17.6 20 19.5 20s3.5-1.6 3.5-3.5S21.4 13 19.5 13zm-7.5 1c-3.3 0-6 2.7-6 6 0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2 0-3.3-2.7-6-6-6z" />
    </svg>
  )
}
