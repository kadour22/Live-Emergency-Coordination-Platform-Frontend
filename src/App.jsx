import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navigation/Navbar'
import CreateIncidentRaport from './components/Incidents/CreateIncidentRaport'
import Login from './components/Users/Login'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
         <Route path='/create-incident/' element={<CreateIncidentRaport/>} />
         <Route path='/login/' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
