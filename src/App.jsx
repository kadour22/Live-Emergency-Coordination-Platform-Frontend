import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navigation/Navbar'
import CreateIncidentRaport from './components/Incidents/CreateIncidentRaport'
import Login from './components/Users/Login'
import Footer from './components/Footer/Footer'
const App = () => {
    if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude)
    })
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/create' element={<CreateIncidentRaport/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
