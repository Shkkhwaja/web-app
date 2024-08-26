import React from 'react'
import Register from './Component/Register'
import Login from './Component/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Component/Home'


export default function App() {
  return (

    <Routes key={location.pathname} location={location}>
      <Route path='/' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
    </Routes>

  )
}
