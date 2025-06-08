import React from 'react'
import { asset } from '../../assets/asset'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRegister from '../../features/authentication/useSignup';
import Spinner from '../../ui/Spinner';

interface FormValues {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState<boolean>(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  const { signup, isPending } = useRegister();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: ''
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const user = {
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password
    }
    signup(user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center min-h-screen py-5'>
      <div className='w-[45%] shadow-md border rounded-2xl px-5 pb-4'>
        <div className='py-4 flex flex-row justify-center items-center gap-4'>
          <img src={asset.logo} alt='logo' className='w-20 h-20 object-contain' />
          <p className='text-5xl font-bold'>
            Register&nbsp;
            <h1 className='font-extrabold text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text'>TECH4</h1>
          </p>
        </div>
        <div className='flex flex-col gap-1 my-3'>
          <div className='flex flex-col justify-between lg:flex-row gap-2'>
            <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
              <label className='text-base font-semibold pl-3'>
                Full Name
              </label>
              <input {...register('fullName', {
                required: 'This field is required'
              })} type='text' placeholder='Full Name' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border w-full text-base focus:ring-2' />
              {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>}
            </div>
          </div>
          <div className='flex flex-col mb-3 space-y-2'>
            <label className='text-base font-semibold pl-3'>
              Username
            </label>
            <input {...register('userName', {
              required: 'This field is required'
            })} type='text' placeholder='Username' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-base focus:ring-2' />
            {errors?.userName && <p className='text-base text-red-500 pl-3'>{errors.userName.message}</p>}
          </div>
          <div className='flex flex-col mb-3 space-y-2'>
            <label className='text-base font-semibold pl-3'>
              Email
            </label>
            <input {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                message: 'Invalid email address'
              }
            })} type='text' placeholder='Email' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-base focus:ring-2' />
            {errors?.email && <p className='text-base text-red-500 pl-3'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col mb-3 space-y-2'>
            <label className='text-base font-semibold pl-3'>
              Phone
            </label>
            <input {...register('phone', {
              required: 'This field is required',
              pattern: {
                value: /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g,
                message: 'Invalid phone number'
              }
            })} type='text' placeholder='Phone' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-base focus:ring-2' />
            {errors?.phone && <p className='text-base text-red-500 pl-3'>{errors.phone.message}</p>}
          </div>
          <div className='flex flex-col mb-3 space-y-2 relative'>
            <label className='text-base font-semibold pl-3'>
              Password
            </label>
            <input {...register('password', {
              required: 'This field is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: 'At least 8 characters, one letter, one number and one special character'
              }
            })} type={showPassword ? 'text' : 'password'} placeholder='Password' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-base focus:ring-2' />
            {errors?.password && <p className='text-base text-red-500 pl-3'>{errors.password.message}</p>}
            {
              showPassword ? (
                <FaEyeSlash onClick={handleShowPassword} className='absolute right-3 top-9 hover:cursor-pointer' />
              ) : (
                <FaRegEye onClick={handleShowPassword} className='absolute right-3 top-9 hover:cursor-pointer' />
              )
            }
          </div>
          <div className='flex flex-col mb-3 space-y-2 relative'>
            <label className='text-base font-semibold pl-3'>
              Password Confirm
            </label>
            <input {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) => value === watch('password') || 'The password confirm do not match'
            })} type={showPasswordConfirm ? 'text' : 'password'} placeholder='Password Confirm' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-base focus:ring-2' />
            {errors?.passwordConfirm && <p className='text-base text-red-500 pl-3'>{errors.passwordConfirm.message}</p>}
            {
              showPasswordConfirm ? (
                <FaEyeSlash onClick={handleShowPasswordConfirm} className='absolute right-3 top-9 hover:cursor-pointer' />
              ) : (
                <FaRegEye onClick={handleShowPasswordConfirm} className='absolute right-3 top-9 hover:cursor-pointer' />
              )
            }
          </div>
        </div>
        <div className='space-y-4'>
          <button disabled={isPending} className={`flex justify-center items-center w-[100%] bg-blue-600 py-[10px] text-white font-medium rounded-xl focus:ring-2 ${isPending ? 'cursor-wait' : ''}`}>
            {isPending ? (
              <>
                <Spinner size={15} />
                <p>Loading...</p>
              </>
            ) : (
              <p>Register</p>
            )}
          </button>
          <hr />
          <div className='text-base flex justify-center items-center'>
            <p>You already have  an account? <Link to={'/login'} className='text-blue-700 hover:cursor-pointer hover:underline hover:underline-offset-1'>Login now</Link></p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Register;
