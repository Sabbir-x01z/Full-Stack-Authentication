import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { MyContext } from '../context/AppContextProvider';

export default function Hero() {

  const {userData} = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center text-center space-y-3'>
      <h2>Hey {userData ? userData.name : 'Developer'} !</h2>
      <h1 className='text-5xl'>Wecome to our app</h1>
        <button onClick={() => navigate('/login')} className='py-4 px-6 border-2 border-black rounded-full'>Get started</button>
    </div>
  )
}
