import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navigation/Navbar'
import CreateIncidentRaport from './components/Incidents/CreateIncidentRaport'
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Footer from './components/Footer/Footer'
import LandingPage from './components/Landing/Landing'
import AdminDashboard from './components/Admin/AdminDashboard'
import Incidentlist from './components/Incidents/Incidentlist'
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreateIncidentRaport />} />
          <Route path='/incidents' element={<Incidentlist />} />
        </Route>

        {/* No layout wrapper here, so no navbar/footer on admin pages */}
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App