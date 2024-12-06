import React from 'react'
import { useNavigate } from 'react-router';
import { useVerifyOtp } from '../../features/authentication/useVerifyOtp';
import Spinner from '../../ui/Spinner';

export interface FormValues {
  email: string;
  otp: string;
}

const VerifyCode: React.FC = () => {
  const [otp, setOtp] = React.useState<number[]>(Array.from({ length: 6 }, (_, i) => i));

  const navigate = useNavigate();

  const { verifyOTP, isPending } = useVerifyOtp();

  const handleSubmit = () => {
    verifyOTP({ email: localStorage.getItem('email_reset') as string, otp: otp.join('') });
  }

  const onChange = (e: any, index: number) => {
    setOtp([
      ...otp.map((num, i) => (i === index ? parseInt(e.target.value) : num))
    ]);

    // if (e.target.value == '' && index != 0) {
    //   e.target.previousSibling.focus();
    // }

    if (e.target.value && index < 5) {
      e.target.nextSibling.focus();
    }
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-[#F9F9F9]'>
      <div className='w-[45%] shadow-md border rounded-2xl px-5 py-10 flex flex-col bg-white'>
        <div className='flex flex-col items-center gap-6'>
          <p className='mx-auto text-3xl font-semibold'>Email Verification</p>
          <form className='flex justify-between gap-4'>
            {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
              <input
                key={index}
                type='text'
                onChange={(e) => onChange(e, index)}
                onKeyDown={(e: any) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }

                  if (e.key === 'ArrowRight') {
                    e.target.nextSibling.focus();
                  }

                  if (e.key === 'ArrowLeft') {
                    e.target.previousSibling.focus();
                  }

                  if (e.key === 'Backspace') {
                    e.preventDefault();
                    e.target.value = '';
                    e.target.previousSibling.focus();
                  }
                }}
                maxLength={1}
                className='w-16 h-16 focus:outline-none focus:ring-1 border-2 text-center border-gray-200 rounded-lg text-2xl ring-blue-500'
              />
            ))}
          </form>
          <p>You didn't recieve code? <button className='text-blue-500 hover:cursor-pointer'>Resend code</button></p>
          <button disabled={isPending} onClick={handleSubmit} className={`flex justify-center items-center px-4 py-2 focus:outline-none text-white rounded-lg ${isPending ? 'cursor-wait bg-blue-400' : 'bg-blue-600'}`}>
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
      </div>
    </div>
  )
}

export default VerifyCode
