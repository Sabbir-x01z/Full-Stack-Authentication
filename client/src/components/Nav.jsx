import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Nav() {

    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between h-16'>
        <h1 onClick={() => navigate('')} className='text-5xl cursor-pointer'>logo</h1>
        <button onClick={() => navigate('/login')} className='px-6 py-2 border-2 border-black rounded-full text-lg'>Login</button>
    </div>
  )
}
