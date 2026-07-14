import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Flame,
  Waves,
  Car,
  ShieldAlert,
  HeartPulse,
  MessageSquareText,
  LocateFixed,
  BellRing,
  Lock,
  Clock3,
  ArrowRight,
} from 'lucide-react'

const FONT_DISPLAY = "'Fraunces', serif"
const FONT_BODY = "'Plus Jakarta Sans', sans-serif"

const incidentTypes = [
  { label: 'Fire', icon: Flame, tint: 'bg-orange-50 text-orange-600 border-orange-100' },
  { label: 'Flood', icon: Waves, tint: 'bg-sky-50 text-sky-600 border-sky-100' },
  { label: 'Accident', icon: Car, tint: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Robbery', icon: ShieldAlert, tint: 'bg-violet-50 text-violet-600 border-violet-100' },
  { label: 'Medical', icon: HeartPulse, tint: 'bg-rose-50 text-rose-600 border-rose-100' },
]

const steps = [
  {
    number: '01',
    icon: MessageSquareText,
    title: 'Tell us what’s happening',
    body: 'Pick the incident type and add a short description. No forms to hunt through, no jargon to decode.',
  },
  {
    number: '02',
    icon: LocateFixed,
    title: 'We pin your location',
    body: 'Beacon reads your device’s GPS the moment you open a report, so you never have to type an address.',
  },
  {
    number: '03',
    icon: BellRing,
    title: 'Responders get notified',
    body: 'Your report moves from pending to acknowledged in real time, and you can check its status any time.',
  },
]

const reassurances = [
  {
    icon: Clock3,
    title: 'Built for the moment you can’t think straight',
    body: 'Three taps and a sentence \u2014 that’s the whole report. Everything else is handled for you.',
  },
  {
    icon: LocateFixed,
    title: 'Located automatically',
    body: 'No cross streets, no guessing your coordinates. Your location travels with the report by default.',
  },
  {
    icon: Lock,
    title: 'Signed in, kept private',
    body: 'Reports are tied to your account, not shared publicly, and visible only to you and responders.',
  },
]

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-teal-50 text-stone-800"
      style={{ fontFamily: FONT_BODY }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600 motion-safe:animate-pulse" />
            Live incident reporting
          </span>

          <h1
            className="mt-6 text-4xl leading-tight text-teal-950 sm:text-5xl"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Help finds you faster.
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-600">
            One tap tells us what’s wrong. Your location goes with it automatically.
            No forms, no hold music, no explaining where you are.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/report"
              className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-50"
            >
              Report an incident
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Signature element: breathing beacon */}
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
          <span className="absolute h-full w-full rounded-full bg-teal-400/20 motion-safe:animate-ping motion-safe:[animation-duration:2.5s]" />
          <span className="absolute h-3/4 w-3/4 rounded-full bg-teal-400/25 motion-safe:animate-ping motion-safe:[animation-duration:2.5s] delay-300" />
          <span className="absolute h-1/2 w-1/2 rounded-full bg-teal-400/30 motion-safe:animate-ping motion-safe:[animation-duration:2.5s] delay-700" />
          <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-teal-700 text-teal-50 shadow-lg">
            <MapPin className="h-10 w-10" strokeWidth={2} />
          </span>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-teal-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <h2
              className="text-3xl text-teal-950"
              style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
            >
              Three steps. Nothing to remember.
            </h2>
            <p className="mt-3 text-stone-600">
              Beacon is designed for a moment when reading a manual is the last thing you want to do.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                  <span
                    className="text-sm font-semibold text-teal-400"
                    style={{ fontFamily: FONT_DISPLAY }}
                  >
                    {step.number}
                  </span>
                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-teal-50">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-teal-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Incident types */}
      <section id="incident-types" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <h2
            className="text-3xl text-teal-950"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Report what you’re seeing.
          </h2>
          <p className="mt-3 text-stone-600">
            Choose the type that fits, and add detail in your own words. You can always update the status later.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {incidentTypes.map(({ label, icon: Icon, tint }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-transform hover:-translate-y-0.5 ${tint}`}
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
              <span className="text-sm font-semibold text-stone-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance */}
      <section className="border-y border-teal-100 bg-teal-900 text-teal-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2
            className="max-w-lg text-3xl leading-snug"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Quiet, careful engineering for a moment that isn’t quiet.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reassurances.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-teal-800 bg-teal-800/50 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-800">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-teal-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-teal-100/80">{item.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2
          className="mx-auto max-w-lg text-3xl text-teal-950"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
        >
          Ready when you need it.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-stone-600">
          Sign in once, and reporting takes seconds from then on.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/report"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-50"
          >
            Report an incident
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-teal-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-stone-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-teal-50">
              <MapPin className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span className="font-semibold text-teal-900" style={{ fontFamily: FONT_DISPLAY }}>
              Beacon
            </span>
          </div>
          <p>Report emergencies. Track their status. Stay reachable.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage