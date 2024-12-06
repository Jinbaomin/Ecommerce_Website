import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { useVerifyEmail } from '../../features/authentication/useVerifyEmail';
import Spinner from '../../ui/Spinner';

export interface FormValues {
  email: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormValues>();

  const { verifyEmail, isPending } = useVerifyEmail();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    verifyEmail({ email: data.email });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center w-full h-screen bg-[#F9F9F9]'>
      <div className='w-[45%] shadow-md border rounded-2xl px-5 py-4 flex flex-col space-y-4 bg-white'>
        <p className='mx-auto text-3xl font-semibold mb-3'>Reset Password</p>
        <label className=''>
          <p className='mb-2 font-medium pl-2'>Please enter your email to reset account</p>
          <input {...register('email')} type='text' placeholder='Enter your email' className='focus:outline-none focus:ring-2 border px-3 py-2 rounded-lg w-full' />
        </label>
        <div className='flex justify-end'>
          <button disabled={isPending} className={`flex focus:outline-none px-3 py-1 rounded-lg text-white ${isPending ? 'cursor-wait bg-blue-400' : 'bg-blue-600'}`}>
            {isPending ? (
              <>
                <Spinner size={15} />
                <p>Loading...</p>
              </>
            ) : (
              <p>Confirm</p>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ResetPassword
