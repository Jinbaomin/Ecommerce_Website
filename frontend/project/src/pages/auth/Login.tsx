import React, { useContext, useEffect } from 'react'
import { asset } from '../../assets/asset'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import useLogin from '../../features/authentication/userSignin';
import Spinner from '../../ui/Spinner';
import { useUser } from '../../features/authentication/userUser';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { AuthContext, useAuthContext } from '../../context/GlobalContext';

type FormValues = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const { login, isPending } = useLogin();
  // const { isPending: isPendingUser , isAuthenticated } = useUser();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmitForm: SubmitHandler<FormValues> = ({ email, password }) => {
    login({ email, password });
  }

  // console.log(localStorage.getItem('access_token'));
  // console.log(localStorage.getItem('access_token'), isAuthenticated, isPendingUser );

  // useEffect(() => {
  //   // if user already login, redirect to home page
  //   if (isAuthenticated && !isPendingUser && localStorage.getItem('access_token')) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, isPendingUser ]);

  // useEffect(() => {
  //   if (localStorage.getItem('access_token')) {
  //     clientQuery.invalidateQueries({
  //       queryKey: ['account']
  //     });
  //     navigate('/');
  //   }
  // }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className='flex justify-center items-center min-h-screen py-5'>
      <div className='w-[35%] shadow-md border rounded-2xl px-5 pb-4'>
        <div className='py-4 flex flex-row justify-center items-center gap-4'>
          <img src={asset.logo} alt='logo' className='w-20 h-20 object-contain' />
          <p className='text-5xl font-bold'>
            Log in&nbsp;
            <h1 className='font-extrabold text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text'>TECH4</h1>
          </p>
        </div>
        <div className='flex flex-col gap-2 mb-1 mt-4'>
          <div className='flex flex-col mb-3 space-y-1'>
            {/* <label className='text-sm font-semibold pl-3'>
              Username
            </label> */}
            <input {...register('email')} type='text' placeholder='Email or username' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border focus:ring-2' />
          </div>
          <div className='flex flex-col mb-3 space-y-1 relative'>
            {/* <label className='text-sm font-semibold pl-3'>
              Password
            </label> */}
            <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder='Password' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border focus:ring-2' />
            {
              showPassword ? (
                <FaEyeSlash onClick={handleShowPassword} className='absolute right-3 top-2 hover:cursor-pointer' />
              ) : (
                <FaRegEye onClick={handleShowPassword} className='absolute right-3 top-2 hover:cursor-pointer' />
              )
            }
          </div>
        </div>
        <div className='flex items-center justify-end hover:cursor-pointer mb-3'>
          <Link to={'reset-password'} className='text-base font-normal text-blue-700 hover:cursor-pointer hover:underline hover:underline-offset-1' >Forgot password</Link>
        </div>
        <div className='space-y-4'>
          <button disabled={isPending} className={`flex justify-center items-center w-full bg-blue-600 px-1 py-[10px] text-white font-medium rounded-xl text-lg focus:ring-2 ${isPending ? 'cursor-wait bg-blue-400' : ''}`}>
            {isPending ? (
              <>
                <Spinner size={15} />
                <p>Loading...</p>
              </>
            ) : (
              <p>Login</p>
            )}
          </button>
          <div className='text-base flex justify-center items-center'>
            <p>You don't have an account? <Link to={'/register'} className='text-blue-700 hover:cursor-pointer hover:underline hover:underline-offset-1'>Register now</Link></p>
          </div>
          <div className='relative mb-4 mt-3'>
            <hr />
            <p className='absolute -top-3 left-[50%] bg-white px-1 text-base font-medium'>or</p>
          </div>
          <button className='w-[100%] border-2 font-medium rounded-xl py-[8px] flex gap-2 justify-center items-center text-base'>
            <img src={asset.google} alt='google' className='w-6 inline-block' />
            <span className='text-black'>Login with Google</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Login
