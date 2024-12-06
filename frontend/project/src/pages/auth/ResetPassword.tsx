import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { useResetPassword } from '../../features/authentication/useResetPassword';
import Spinner from '../../ui/Spinner';

export interface FormValues {
  password: string;
  passwordConfirm: string;
}

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    defaultValues: {
      password: '',
      passwordConfirm: ''
    }
  });

  const { resetPassword, isPending } = useResetPassword();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const input = {
      email: localStorage.getItem('email_reset') as string,
      newPassword: data.password
    }
    resetPassword(input);
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-[#F9F9F9]'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[45%] shadow-md border rounded-2xl px-5 py-10 flex flex-col bg-white'>
        <div className='flex flex-col items-center gap-6'>
          <p className='mx-auto text-3xl font-semibold'>Reset New Password</p>
          <div className='w-full '>
            <div className='flex flex-col mb-3 space-y-2 relative w-[80%] mx-auto'>
              <label className='text-sm font-semibold pl-3'>
                Password
              </label>
              <input {...register('password', {
                required: 'This field is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: 'At least 8 characters, one letter, one number and one special character'
                }
              })} type={showPassword ? 'text' : 'password'} placeholder='Password' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-sm focus:ring-2' />
              {errors?.password && <p className='text-sm text-red-500 pl-3'>{errors.password.message}</p>}
              {
                showPassword ? (
                  <FaEyeSlash onClick={handleShowPassword} className='absolute right-3 top-8 hover:cursor-pointer' />
                ) : (
                  <FaRegEye onClick={handleShowPassword} className='absolute right-3 top-8 hover:cursor-pointer' />
                )
              }
            </div>
            <div className='flex flex-col mb-3 space-y-2 relative w-[80%] mx-auto'>
              <label className='text-sm font-semibold pl-3'>
                Password Confirm
              </label>
              <input {...register('passwordConfirm', {
                required: 'This field is required',
                validate: (value) => value === watch('password') || 'The password confirm do not match'
              })} type={showPasswordConfirm ? 'text' : 'password'} placeholder='Password Confirm' className='focus:outline-none rounded-xl bg-slate-100 px-3 py-2 border text-sm focus:ring-2' />
              {errors?.passwordConfirm && <p className='text-sm text-red-500 pl-3'>{errors.passwordConfirm.message}</p>}
              {
                showPasswordConfirm ? (
                  <FaEyeSlash onClick={handleShowPasswordConfirm} className='absolute right-3 top-8 hover:cursor-pointer' />
                ) : (
                  <FaRegEye onClick={handleShowPasswordConfirm} className='absolute right-3 top-8 hover:cursor-pointer' />
                )
              }
            </div>
          </div>
          <button disabled={isPending} className={`flex justify-center items-center px-3 py-[5px] hover:bg-blue-500 focus:outline-none text-white rounded-lg ${isPending ? 'cursor-wait bg-blue-400' : 'bg-blue-600'}`}>
            {isPending ? (
              <>
                <Spinner size={15} />
                <p>Loading...</p>
              </>
            ) : (
              <p>Submit</p>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
