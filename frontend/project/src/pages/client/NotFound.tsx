import React from 'react'
import { asset } from '../../assets/asset'
import { useNavigate } from 'react-router'

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-start py-14 space-y-3'>
      <img src={asset.NotFound} className='w-[35vw] object-cover mb-4' />
      <p className='font-semibold text-lg'>Opps! Page Not Found</p>
      <p className='text-sm'>Sorry, we can't find the page you're looking for</p>
      <button onClick={() => navigate('/')} className='bg-blue-500 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 text-white hover:cursor-pointer'>Go Back</button>
    </div>
  )
}

export default NotFound
