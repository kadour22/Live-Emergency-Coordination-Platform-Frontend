import { useEffect, useState, useRef } from "react";
import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  LayoutDashboard,
  ListChecks,
  Map as MapIcon,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Flame,
  Waves,
  Car,
  ShieldAlert,
  HeartPulse,
  Clock3,
  CheckCircle2,
  Loader2,
  MoreVertical,
} from 'lucide-react'

const FONT_DISPLAY = "'Fraunces', serif"
const FONT_BODY = "'Plus Jakarta Sans', sans-serif"

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Incidents', icon: ListChecks },
  { label: 'Map view', icon: MapIcon },
  { label: 'Responders', icon: Users },
  { label: 'Settings', icon: Settings },
]

const incidentTypeMeta = {
  fire: { label: 'Fire', icon: Flame, tint: 'bg-orange-50 text-orange-600' },
  flood: { label: 'Flood', icon: Waves, tint: 'bg-sky-50 text-sky-600' },
  accident: { label: 'Accident', icon: Car, tint: 'bg-amber-50 text-amber-600' },
  robbery: { label: 'Robbery', icon: ShieldAlert, tint: 'bg-violet-50 text-violet-600' },
  medical: { label: 'Medical', icon: HeartPulse, tint: 'bg-rose-50 text-rose-600' },
}

const statusMeta = {
  pending: { label: 'Pending', icon: Clock3, tint: 'bg-amber-50 text-amber-700 border-amber-200' },
  in_progress: { label: 'In progress', icon: Loader2, tint: 'bg-sky-50 text-sky-700 border-sky-200' },
  resolved: { label: 'Resolved', icon: CheckCircle2, tint: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

// Template data — swap for your API response (e.g. incident_data_service.report_emergency_incident_list)
const mockIncidents = [
  { id: 241, type: 'fire', description: 'Smoke reported near the market stalls on 3rd street.', reporter: 'Amine K.', location: '36.806, 10.181', status: 'pending', created_at: '2026-07-10T08:12:00' },
  { id: 240, type: 'medical', description: 'Person collapsed near the bus station entrance.', reporter: 'Sarra B.', location: '36.802, 10.179', status: 'in_progress', created_at: '2026-07-10T07:58:00' },
  { id: 239, type: 'accident', description: 'Two-car collision blocking the right lane.', reporter: 'Youssef T.', location: '36.811, 10.165', status: 'in_progress', created_at: '2026-07-10T07:40:00' },
  { id: 238, type: 'flood', description: 'Street flooding after heavy rain, water rising fast.', reporter: 'Nour A.', location: '36.798, 10.190', status: 'resolved', created_at: '2026-07-09T22:15:00' },
  { id: 237, type: 'robbery', description: 'Attempted break-in reported by a neighbor.', reporter: 'Karim S.', location: '36.815, 10.172', status: 'pending', created_at: '2026-07-09T21:03:00' },
  { id: 236, type: 'fire', description: 'Small kitchen fire, contained but smoke visible outside.', reporter: 'Ines M.', location: '36.809, 10.183', status: 'resolved', created_at: '2026-07-09T19:47:00' },
  { id: 235, type: 'medical', description: 'Elderly resident needs assistance, difficulty breathing.', reporter: 'Hedi R.', location: '36.804, 10.176', status: 'resolved', created_at: '2026-07-09T18:22:00' },
  { id: 234, type: 'accident', description: 'Motorbike down near the roundabout, rider conscious.', reporter: 'Mehdi L.', location: '36.813, 10.169', status: 'pending', created_at: '2026-07-09T17:05:00' },
]

const stats = [
  { label: 'Total incidents', value: mockIncidents.length, icon: ListChecks, tint: 'bg-teal-700 text-teal-50' },
  { label: 'Pending', value: mockIncidents.filter((i) => i.status === 'pending').length, icon: Clock3, tint: 'bg-amber-500 text-white' },
  { label: 'In progress', value: mockIncidents.filter((i) => i.status === 'in_progress').length, icon: Loader2, tint: 'bg-sky-500 text-white' },
  { label: 'Resolved today', value: mockIncidents.filter((i) => i.status === 'resolved').length, icon: CheckCircle2, tint: 'bg-emerald-500 text-white' },
]

const formatTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // realtime feature

    const [incidents, setIncidents] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);
  
    // 1. Load initial incidents via axios
    useEffect(() => {
      const fetchIncidents = async () => {
        try {
          const res = await IncidentEndpoints.incidents_list();
          setIncidents(res.data);
        } catch (err) {
          console.log("Failed to fetch incidents:");
        } finally {
          setLoading(false);
        }
      };
      fetchIncidents();
    }, []);
  
    // 2. Open websocket once, for realtime updates
    useEffect(() => {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const host = "127.0.0.1:8000";
      const socket = new WebSocket(`${protocol}://${host}/ws/incidents/`);
      socketRef.current = socket;
  
      socket.onopen = () => {
        console.log("websocket connected");
        setIsConnected(true);
      };
  
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
  
        if (message.type === "emergency_alert") {
          setIncidents((prev) => [message.data, ...prev]);
        }
      };
  
      socket.onclose = () => {
        console.log("websocket disconnected");
        setIsConnected(false);
      };
  
      socket.onerror = (err) => {
        console.error("websocket error:", err);
      };
  
      // 3. Cleanup on unmount
      return () => {
        socket.close();
      };
    }, []);
  
    if (loading) return <div>Loading incidents...</div>;
  

  // end featuer
 
 
  return (
    <div className="min-h-screen bg-teal-50 text-stone-800" style={{ fontFamily: FONT_BODY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-teal-950/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-teal-100 bg-white transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-teal-50">
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-semibold tracking-tight text-teal-900" style={{ fontFamily: FONT_DISPLAY }}>
              Beacon
            </span>
          </Link>
          <button
            className="rounded-md p-1 text-stone-400 hover:text-stone-600 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                active
                  ? 'bg-teal-700 text-teal-50 shadow-sm'
                  : 'text-stone-600 hover:bg-teal-50 hover:text-teal-800'
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              {label}
            </a>
          ))}
        </nav>

        <div className="border-t border-teal-100 p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-800">
              AD
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-stone-800">Admin</p>
              <p className="truncate text-xs text-stone-500">admin@beacon.app</p>
            </div>
          </div>
          <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-500 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
            <LogOut className="h-4 w-4" strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-teal-100 bg-teal-50/90 px-4 py-4 backdrop-blur sm:px-6">
          <button
            className="rounded-md p-1.5 text-stone-500 hover:bg-white hover:text-teal-800 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-xl text-teal-950 sm:text-2xl" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500 }}>
              Incident dashboard
            </h1>
            <p className="hidden text-sm text-stone-500 sm:block">Live reports from the field, newest first.</p>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                className="w-56 rounded-full border border-teal-100 bg-white py-2 pl-9 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              />
            </div>
            <button className="relative rounded-full border border-teal-100 bg-white p-2.5 text-stone-500 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-teal-100 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-stone-700 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-800">
                AD
              </span>
              <ChevronDown className="hidden h-4 w-4 sm:block" />
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, tint }) => (

              <div key={label} className="rounded-2xl border border-teal-100 bg-white p-5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tint}`}>
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="mt-4 text-2xl font-semibold text-teal-950" style={{ fontFamily: FONT_DISPLAY }}>
                  {value}
                </p>
                <p className="mt-1 text-sm text-stone-500">{label}</p>
              </div>
            
            ))}
          </div>

          {/* Incident list — table on md+ */}
          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-teal-100 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 bg-teal-50/60 text-xs font-semibold uppercase tracking-wide text-stone-500">
                  <th className="px-6 py-3">Incident</th>
                  <th className="px-6 py-3">Reporter</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Reported</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">

                {/* Incident list */}
                {incidents.map((incident) => {
                  const type = incidentTypeMeta[incident.type]
                  const status = statusMeta[incident.status]
                  const TypeIcon = type.icon
                  const StatusIcon = status.icon
                  return (

                    <tr key={incident.id} className="transition-colors hover:bg-teal-50/40">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${type.tint}`}>
                            <TypeIcon className="h-4 w-4" strokeWidth={2} />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800">{type.label} · #{incident.id}</p>
                            <p className="max-w-xs truncate text-xs text-stone-500">{incident.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-600">{incident.reporter}</td>
                      <td className="px-6 py-4 font-mono text-xs text-stone-500">{incident.location}</td>
                      <td className="px-6 py-4 text-stone-500">{formatTime(incident.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.tint}`}>
                          <StatusIcon className={`h-3 w-3 ${incident.status === 'in_progress' ? 'animate-spin' : ''}`} strokeWidth={2.5} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-md p-1.5 text-stone-400 hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label="More actions">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )

                })}
              </tbody>
            </table>
          </div>

          {/* Incident list — cards on mobile */}
          <div className="mt-8 space-y-3 md:hidden">
            {mockIncidents.map((incident) => {
              const type = incidentTypeMeta[incident.type]
              const status = statusMeta[incident.status]
              const TypeIcon = type.icon
              const StatusIcon = status.icon
              return (
                <div key={incident.id} className="rounded-2xl border border-teal-100 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${type.tint}`}>
                      <TypeIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-stone-800">{type.label} · #{incident.id}</p>
                        <span className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${status.tint}`}>
                          <StatusIcon className={`h-3 w-3 ${incident.status === 'in_progress' ? 'animate-spin' : ''}`} strokeWidth={2.5} />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">{incident.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                        <span>{incident.reporter}</span>
                        <span className="font-mono">{incident.location}</span>
                        <span>{formatTime(incident.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard