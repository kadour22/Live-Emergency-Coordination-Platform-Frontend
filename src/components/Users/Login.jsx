import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance, { UserEndpoints } from '../../api/axios_instance'
import { MapPin, User, Lock, CircleAlert, Loader2, Eye, EyeOff } from 'lucide-react'

const FONT_DISPLAY = "'Fraunces', serif"
const FONT_BODY = "'Plus Jakarta Sans', sans-serif"

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!username.trim() || !password) {
      setSubmitError('Please enter your username and password.')
      return
    }

    setSubmitting(true)
    try {
      const response = await UserEndpoints.get_token({ username, password })
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      navigate('/')
    } catch (error) {
      console.log('error logging in:', error)
      setSubmitError(
        error?.response?.data?.detail || 'Invalid username or password. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-teal-50 px-4 py-12 text-stone-800"
      style={{ fontFamily: FONT_BODY }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-teal-50 shadow-sm">
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h1
            className="text-3xl text-teal-950"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Sign in to report incidents and track their status.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-sm font-semibold text-teal-950">
              Username
            </label>
            <div className="relative mt-2">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-teal-100 bg-teal-50/40 py-3 pl-10 pr-4 text-sm text-stone-800 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-teal-950">
                Password
              </label>
            </div>
            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-teal-100 bg-teal-50/40 py-3 pl-10 pr-10 text-sm text-stone-800 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {submitError && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          New to Beacon?{' '}
          <Link
            to="/register"
            className="font-semibold text-teal-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login