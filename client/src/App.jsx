import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import ResePassword from "./pages/ResePassword"
import Layout from "./components/Layout"
import { ToastContainer, toast } from 'react-toastify';

function App() {


  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/verify-email" element={<VerifyEmail/>}></Route>
          <Route path="/reset-password" element={<ResePassword/>}></Route>
        </Route>
    </Routes>
    </div>
  )
}

export default App
