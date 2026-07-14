import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance, { IncidentEndpoints } from '../../api/axios_instance'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import {
  MapPin,
  Flame,
  Waves,
  Car,
  ShieldAlert,
  HeartPulse,
  LocateFixed,
  CircleAlert,
  CircleCheck,
  Loader2,
} from 'lucide-react'

const FONT_DISPLAY = "'Fraunces', serif"
const FONT_BODY = "'Plus Jakarta Sans', sans-serif"

// Leaflet's default marker icon paths break under bundlers (webpack/vite) unless
// we re-point them at the imported assets. Without this, markers render as broken images.
const defaultMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const incidentTypeOptions = [
  { value: 'fire', label: 'Fire', icon: Flame, tint: 'bg-orange-50 text-orange-600 border-orange-100', tintActive: 'bg-orange-100 border-orange-400 ring-1 ring-orange-400' },
  { value: 'flood', label: 'Flood', icon: Waves, tint: 'bg-sky-50 text-sky-600 border-sky-100', tintActive: 'bg-sky-100 border-sky-400 ring-1 ring-sky-400' },
  { value: 'accident', label: 'Accident', icon: Car, tint: 'bg-amber-50 text-amber-600 border-amber-100', tintActive: 'bg-amber-100 border-amber-400 ring-1 ring-amber-400' },
  { value: 'robbery', label: 'Robbery', icon: ShieldAlert, tint: 'bg-violet-50 text-violet-600 border-violet-100', tintActive: 'bg-violet-100 border-violet-400 ring-1 ring-violet-400' },
  { value: 'medical', label: 'Medical', icon: HeartPulse, tint: 'bg-rose-50 text-rose-600 border-rose-100', tintActive: 'bg-rose-100 border-rose-400 ring-1 ring-rose-400' },
]

// Renders inside <MapContainer>. Lets the person fine-tune their location by
// clicking anywhere on the map or dragging the marker, and keeps the parent's
// latitude/longitude state in sync with whatever position is chosen.
const LocationPicker = ({ position, onChange }) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng)
    },
  })

  return position ? (
    <Marker
      position={position}
      icon={defaultMarkerIcon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng()
          onChange(lat, lng)
        },
      }}
    />
  ) : null
}

const CreateIncidentRaport = () => {
  const navigate = useNavigate()

  const [incidentType, setIncidentType] = useState('fire')
  const [incidentDescription, setIncidentDescription] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [locationError, setLocationError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const setPosition = (lat, lng) => {
    setLatitude(lat)
    setLongitude(lng)
    setLocationError('')
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          setLocationError('Could not get your location. Please enable location access, or pick your location on the map below.')
        }
      )
    } else {
      setLocationError('Geolocation is not supported by this browser. Please pick your location on the map below.')
    }
  }

  useEffect(() => {
    const is_logged_in = localStorage.getItem('access_token')
    if (!is_logged_in) {
      navigate('/')
      return
    }
    getLocation()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSuccess(false)

    if (!latitude || !longitude) {
      setSubmitError('Location is required. Please allow location access or pick a point on the map, then try again.')
      return
    }
    if (!incidentDescription.trim()) {
      setSubmitError('Please describe the incident.')
      return
    }

    const data = {
      incident_type: incidentType,
      description: incidentDescription, // matches backend field name
      latitude: latitude,
      longitude: longitude,
    }

    setSubmitting(true)
    try {
      const response = await IncidentEndpoints.create_incident(data)
      console.log(response.data)
      setSuccess(true)
      setIncidentDescription('')
    } catch (error) {
      console.log('error creating incident report:', error)
      setSubmitError(
        error?.response?.data?.error || 'Something went wrong. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Leaflet needs [lat, lng] as numbers; fall back to a sane default center
  // (used only for the initial map view before geolocation resolves).
  const mapPosition = latitude && longitude ? [Number(latitude), Number(longitude)] : null
  const defaultCenter = [36.8065, 10.1815] // Tunis, as a fallback center

  return (
    <div
      className="min-h-screen bg-teal-50 px-4 py-12 text-stone-800 sm:px-6"
      style={{ fontFamily: FONT_BODY }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-teal-50 shadow-sm">
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h1
            className="text-3xl text-teal-950"
            style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}
          >
            Create an incident report
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Pick what’s happening and add a few details. Your location is included automatically.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Incident type */}
          <div>
            <label className="text-sm font-semibold text-teal-950">Incident type</label>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {incidentTypeOptions.map(({ value, label, icon: Icon, tint, tintActive }) => {
                const isActive = incidentType === value
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setIncidentType(value)}
                    aria-pressed={isActive}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                      isActive ? tintActive : `${tint} hover:brightness-95`
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="text-xs font-semibold text-stone-700">{label}</span>
                  </button>
                )
              })}
            </div>
            {/* Hidden select kept for form semantics / easy testing, mirrors button group above */}
            <select
              name="incidentType"
              id="incidentType"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value="fire">Fire</option>
              <option value="flood">Flood</option>
              <option value="accident">Accident</option>
              <option value="robbery">Robbery</option>
              <option value="medical">Medical</option>
            </select>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="incidentDescription" className="text-sm font-semibold text-teal-950">
              Description
            </label>
            <input
              type="text"
              name="incidentDescription"
              id="incidentDescription"
              placeholder="Describe the incident..."
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              className="mt-3 w-full rounded-xl border border-teal-100 bg-teal-50/40 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            />
          </div>

          {/* Location status */}
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3 text-sm">
            <LocateFixed className="h-4 w-4 flex-shrink-0 text-teal-700" strokeWidth={2} />
            {latitude && longitude ? (
              <span className="text-teal-800">
                Location captured
                <span className="ml-1 font-mono text-xs text-teal-600">
                  ({Number(latitude).toFixed(5)}, {Number(longitude).toFixed(5)})
                </span>
              </span>
            ) : (
              <span className="text-stone-500">Detecting your location…</span>
            )}
          </div>

          {/* Map: lets the person confirm or adjust the detected point */}
          <div className="mt-4">
            <label className="text-sm font-semibold text-teal-950">
              Confirm location on the map
            </label>
            <p className="mt-1 text-xs text-stone-500">
              Click anywhere on the map, or drag the pin, to adjust the reported location.
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-teal-100">
              <MapContainer
                center={mapPosition || defaultCenter}
                zoom={mapPosition ? 15 : 12}
                style={{ height: '280px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker position={mapPosition} onChange={setPosition} />
              </MapContainer>
            </div>
            <button
              type="button"
              onClick={getLocation}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <LocateFixed className="h-3.5 w-3.5" strokeWidth={2.5} />
              Use my current location
            </button>
          </div>

          {/* Alerts */}
          {locationError && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span>{locationError}</span>
            </div>
          )}
          {submitError && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span>{submitError}</span>
            </div>
          )}
          {success && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CircleCheck className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span>Incident reported successfully.</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />}
            {submitting ? 'Submitting…' : 'Submit report'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateIncidentRaport