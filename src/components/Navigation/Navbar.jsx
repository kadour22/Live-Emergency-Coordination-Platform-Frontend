import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MapPin, LogOut } from 'lucide-react'

const FONT_DISPLAY = "'Fraunces', serif"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Re-checks on every route change, since login/logout usually navigates elsewhere
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'))
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-teal-100/80 bg-teal-50/90 backdrop-blur">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
      `}</style>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-teal-50">
            <MapPin className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span
            className="text-lg font-semibold tracking-tight text-teal-900"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Beacon
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm">
            How it works
          </a>
          <a href="#incident-types" className="transition-colors hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm">
            Incident types
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 transition-colors hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="transition-colors hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm">
              Sign in
            </Link>
          )}
        </nav>
        {isLoggedIn ?(
            <Link
          to="/create"
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-50"
        >
          Report now
        </Link>
        ) :(
          <Link
          to="/login"
          className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-50"
        >
          Report now
        </Link>
        )
        }
        
      </div>
    </header>
  )
}

export default Navbar