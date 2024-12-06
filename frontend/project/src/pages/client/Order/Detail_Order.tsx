import React, { useEffect } from 'react'
import { convertCurrency } from '../../../helper/helper'
import { asset } from '../../../assets/asset'
import { useOrderById } from '../../../features/order/useOrderById'
import FullPage from '../../../ui/FullPage'
import Spinner from '../../../ui/Spinner'
import { useNavigate } from 'react-router'
import { IoArrowBack } from 'react-icons/io5';

const colorStatus = {
  'PENDING': 'bg-cyan-500',
  'DELIVERED': 'bg-green-500',
  'CANCELED': 'bg-red-500'
}

const Detail_Order: React.FC = () => {
  const { data, isPending } = useOrderById();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const order = data?.data;

  return (
    <div className='w-[90%] mx-auto border-1 border-black p-3 rounded-xl'>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-lg hover:bg-violet-200 mb-2'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      {/* <div className='flex flex-col items-center mb-10'>
        <div className='relative'>
          <img src={asset.box} alt="" className='w-60 h-60 object-cover' />
          <img src={asset.checked} alt="" className='w-14 h-14 absolute bottom-8 right-5' />
        </div>
        <h1 className='font-bold text-5xl mb-2'>Check out successfully!</h1>
        <p className='text-lg font-light'>Thank you for your order.</p>
      </div> */}
      <div className='text-lg space-y-1 px-4 py-6'>
        <div className='mb-5 flex gap-3 justify-center items-center'>
          <p className='text-3xl font-semibold text-center'>Detail Order</p>
          <span className={`bg-blue-600 px-2 py-1 rounded-full text-white text-lg font-medium ${colorStatus[order?.status]}`}>{order?.status}</span>
        </div>
        <p className='font-normal'>Order ID: <span className='font-semibold'>#{order?.orderId}</span></p>
        <p className='font-normal'>Name: <span className='font-semibold'>{order?.user.fullName}</span></p>
        <p className='font-normal'>Email: <span className='font-semibold'>{order?.user.email}</span></p>
        <p className='font-normal'>Phone: <span className='font-semibold'>{order?.user.phone}</span></p>
        <p className='font-normal'>Ship To: <span className='font-semibold'>{order?.orderInfo.shipTo}</span></p>
        <p className='font-normal'>Checkout date: <span className='font-semibold italic'>{order?.createdAt}</span></p>
        <p className='font-normal'>Shipping method: <span className='font-semibold'>{order?.orderInfo.shippingMethod}</span></p>
        <p className='font-normal'>Total: <span className='font-semibold text-red-500'>{convertCurrency(order?.total)} VND</span></p>
      </div>
      <div className='mt-4 border-[1px] border-black'>
        <div className='flex items-center'>
          <div className='border-[1px] border-black font-semibold text-lg py-2 px-1 w-[70%] text-center bg-slate-300'>Product</div>
          <div className='border-[1px] border-black font-semibold text-lg py-2 px-1 flex-1 text-center bg-slate-300'>Total price</div>
        </div>
        {order?.orderItems.map(item => (
          <div className='flex border-black'>
            <div className='border-[1px] border-black py-2 px-1 w-[70%] text-center flex gap-2 items-center'>
              <img src={item.product.images[0]} alt="" className='w-28 h-28' />
              <div className='flex gap-2 items-center'>
                <p className='font-medium line-clamp-1 w-[80%]'>{item.product.productName}</p>
                <p className='text-rose-600'>(x{item.quantity})</p>
              </div>
            </div>
            <div className='border-[1px] border-black py-2 px-1 flex-1 text-center flex items-center justify-center'>
              <span className='text-red-500 font-medium'>{convertCurrency(item.total)} VND</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Detail_Order
