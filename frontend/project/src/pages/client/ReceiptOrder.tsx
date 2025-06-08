import React from 'react'
import { asset } from '../../assets/asset';
import { convertCurrency } from '../../helper/helper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IOrder } from '../../types/backend';
import FullPage from '../../ui/FullPage';
import NotFound from './NotFound';

const ReceiptOrder: React.FC = () => {
  const queryClient = useQueryClient();

  const orderId = window.location.pathname.split('/')[2];

  const order: IOrder | undefined = queryClient.getQueryData(['detailOrder', parseInt(orderId)]);

  if (!order) {
    return <NotFound />
  }

  return (
    <div className='py-10'>
      <div className='flex flex-col items-center mb-10'>
        <div className='relative'>
          <img src={asset.box} alt="" className='w-60 h-60 object-cover' />
          <img src={asset.checked} alt="" className='w-14 h-14 absolute bottom-8 right-5' />
        </div>
        <h1 className='font-bold text-5xl mb-2'>Check out successfully!</h1>
        <p className='text-lg font-light'>Thank you for your order.</p>
      </div>
      <div className='text-lg space-y-1 w-[90%] mx-auto border-2 rounded-xl px-4 py-6'>
        <p className='text-3xl mb-3 font-semibold text-center'>Detail Order</p>
        <p className='font-normal'>Order ID: <span className='font-semibold'># {order.orderId}</span></p>
        <p className='font-normal'>Name: <span className='font-semibold'>{order.user.fullName}</span></p>
        <p className='font-normal'>Email: <span className='font-semibold'>{order.user.email}</span></p>
        <p className='font-normal'>Phone: <span className='font-semibold'>{order.user.phone}</span></p>
        <p className='font-normal'>Ship To: <span className='font-semibold'>{order.orderInfo.shipTo}</span></p>
        <p className='font-normal'>Date to checkout: <span className='font-semibold'>{order.createdAt}</span></p>
        <p className='font-normal'>Shipping method: <span className='font-semibold'>{order.orderInfo.shippingMethod}</span></p>
        <p className='font-normal'>Total: <span className='font-semibold text-red-500'>{convertCurrency(order.total)}</span></p>

        <div className='mt-4'>
          <div className='flex items-center'>
            <div className='border-1 border-black py-2 px-1 w-[70%] text-center bg-slate-300'>Product</div>
            <div className='border-1 border-black py-2 px-1 flex-1 text-center bg-slate-300'>Total price</div>
          </div>
          {order.orderItems.map(item => (
            <div className='flex border-black'>
              <div className='border-1 border-black py-2 px-1 w-[70%] text-center flex gap-2 items-center'>
                <img src={item.product.images[0]} alt="" className='w-28 h-28' />
                <div className='flex gap-2 items-center'>
                  <p className='font-medium line-clamp-1 w-[80%]'>{item.product.productName}</p>
                  <p className='text-rose-600'>(x{item.quantity})</p>
                </div>
              </div>
              <div className='border-1 border-black py-2 px-1 flex-1 text-center flex items-center justify-center'>
                <span className='text-red-500 font-medium'>{convertCurrency(item.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReceiptOrder;
