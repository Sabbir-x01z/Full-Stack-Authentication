import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/AppContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {backendUrl, setIsloggedin, getUserData} = useContext(MyContext);

  const navigate = useNavigate();

  const [state, setState] = useState('signUp');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if(state === 'signUp'){

        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if(data.success){
          setIsloggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }

      }else{

        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if(data.success){
          setIsloggedin(true);
          getUserData();
          navigate('/');
        }else{
          toast.error(data.message);
        }

      }
    } catch (error) {
      
    }
  }



  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>

      <h1>LOGO</h1>
      <div>
        <h1 className='text-3xl'>{state === 'signUp' ? 'Create Account':'Login to your Account'}</h1>
      </div>

      <form onSubmit={onSubmitHandler} className='flex flex-col space-y-2'>
        <div className='flex flex-col space-y-3 mt-4'>
          {state === 'signUp' && (<input onChange={e => setName(e.target.value)} value={name} className='py-2 px-6 border-2 border-black rounded-full text-lg' type="text" placeholder="Inter your full name" />)}
          <input onChange={e => setEmail(e.target.value)} value={email} className='py-2 px-6 border-2 border-black rounded-full text-lg' type="email" placeholder="email" />
          <input onChange={e => setPassword(e.target.value)} value={password} className='py-2 px-6 border-2 border-black rounded-full text-lg' type="password" placeholder="Inter your password" />
        </div>
        <div className='flex justify-between text-yellow-600'>
          <p onClick={() => navigate('/reset-password')} className='cursor-pointer'>Forgot password</p>
          <p onClick={() => setState(state === 'signUp' ? 'signIn' : 'signUp')} className='cursor-pointer'>{state === 'signUp' ? 'Login' : 'register'}</p>
        </div>
        <button className='w-full py-2 px-6 border-2 border-black rounded-full hover:bg-slate-500'>{state === 'signUp' ? 'Register' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login
