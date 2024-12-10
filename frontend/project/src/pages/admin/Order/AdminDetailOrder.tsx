import React, { useEffect } from 'react'
import { convertCurrency } from '../../../helper/helper'
import { useNavigate } from 'react-router'
import { IoArrowBack } from 'react-icons/io5';
import { Select, Space } from 'antd';
import { useOrderById } from '../../../features/order/useOrderById';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { useUpdateCartItem } from '../../../features/cart/useUpdateCartItem';
import { useUpdateStatusOrder } from '../../../features/order/useUpdateStatusOrder';

const shippingCost = {
  'Free Shipping': 0,
  'Regular Shipping': 20000,
  'Express Shipping': 30000,
}

const colorStatus = {
  'PENDING': 'bg-blue-500',
  'DELIVERED': 'bg-green-500',
  'CANCELED': 'bg-red-500'
}

const AdminDetailOrder: React.FC = () => {
  const navigate = useNavigate();
  const { updateStatus, isPending: isPendingUpdateStatus } = useUpdateStatusOrder();

  const { data, isPending } = useOrderById();

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const handleUpdateStatus = (status: string) => {
    updateStatus({ orderId: data?.data.orderId, status });
  }

  const order = data?.data;
  const customer = data?.data.user;

  return (
    <div className='pb-5'>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-xl hover:bg-sky-200 mb-3'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      <div className='flex items-center gap-2 mb-4 mx-2'>
        <p className='text-lg'>Order ID: <span className='font-medium'>#{order?.orderId}</span></p>
        <p className={`px-2 py-1 ${colorStatus[order?.status]} text-white font-medium rounded-xl`}>{order?.status}</p>
      </div>
      <div className='grid grid-cols-[2fr_1fr] items-start gap-4 pr-5'>
        <div className='bg-white shadow-md py-4 rounded-lg border'>
          <div className='mb-4 px-4 flex items-center gap-2'>
            <div className='text-lg font-medium'>Order Information</div>
            {order?.status === 'PENDING' && (
              <div className='flex gap-2'>
                <button onClick={() => handleUpdateStatus('DELIVERED')} className={`px-2 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-base text-white font-medium ${isPendingUpdateStatus && 'cursor-progress'}`}>Approve</button>
                <button onClick={() => handleUpdateStatus('CANCELED')} className={`px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-base text-white font-medium ${isPendingUpdateStatus && 'cursor-progress'}`}>Cancel</button>
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <div className='bg-slate-100 grid grid-cols-[4fr_2fr_2fr_2fr] px-5 py-2'>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            {order?.orderItems.map(orderItem => (
              <>
                <div className='grid grid-cols-[4fr_2fr_2fr_2fr] items-center px-5 py-2 text-sm'>
                  <div className='flex items-center w-[90%] gap-1'>
                    <img src={orderItem.product.images[0]} alt="" className='w-14 h-14' />
                    <p className='line-clamp-1'>{orderItem.product.productName}</p>
                  </div>
                  <p>{convertCurrency(orderItem.product.salePrice)} VND</p>
                  <p>{orderItem.quantity}</p>
                  <p>{convertCurrency(orderItem.total)} VND</p>
                </div>
                <span className='border border-black'></span>
              </>
            ))}
            {/* <div className='grid grid-cols-[4fr_2fr_2fr_2fr] items-center px-5 py-2 text-sm'>
              <div className='flex items-center w-[90%] gap-1'>
                <img src="https://product.hstatic.net/200000722513/product/ook_air_m2_8gpu_16gb_256gb_-_midnight_8ead913e1d624d79be608bbbc7f46f94_f825a6934627488b965e487885ce51dd_grande.jpg" alt="" className='w-14 h-14' />
                <p className='line-clamp-1'>MacBook Air M3 13 inch 2024 8GB - 256GB</p>
              </div>
              <p>{convertCurrency(20000000)} VND</p>
              <p>23</p>
              <p>{convertCurrency(23000000)} VND</p>
            </div>
            <span className='border border-black'></span>
            <div className='grid grid-cols-[4fr_2fr_2fr_2fr] items-center px-5 py-2 text-sm'>
              <div className='flex items-center w-[90%] gap-1'>
                <img src="https://product.hstatic.net/200000722513/product/ook_air_m2_8gpu_16gb_256gb_-_midnight_8ead913e1d624d79be608bbbc7f46f94_f825a6934627488b965e487885ce51dd_grande.jpg" alt="" className='w-14 h-14' />
                <p className='line-clamp-1'>MacBook Air M3 13 inch 2024 8GB - 256GB</p>
              </div>
              <p>{convertCurrency(20000000)} VND</p>
              <p>23</p>
              <p>{convertCurrency(23000000)} VND</p>
            </div>
            <span className='border border-black'></span> */}
            <div className='mt-4 flex flex-col items-end text-base px-4'>
              <div className='flex gap-6'>
                <div className='text-slate-600'>
                  <p>Subtotal: </p>
                  <p>Shipping fee: </p>
                  <p className='font-semibold'>Total: </p>
                </div>
                <div className='font-medium'>
                  <p>{convertCurrency(order?.total - shippingCost[order?.orderInfo.shippingMethod])} VND</p>
                  <p>{convertCurrency(shippingCost[order?.orderInfo.shippingMethod])} VND</p>
                  <p className='text-red-500'>{convertCurrency(order?.total)} VND</p>
                </div>
              </div>
              {/* <p className='px-5'>Subtotal: <span>{convertCurrency(46000000)} VND</span></p>
              <p className='px-5'>Shipping fee: <span>{convertCurrency(30000)} VND</span> VND</p>
              <p className='px-5'>Total: <span>{convertCurrency(46030000)} VND</span> VND</p> */}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='bg-white shadow-md p-4 rounded-lg border space-y-4'>
            <p className='text-lg font-medium'>Customer Detail</p>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center w-10 h-10 bg-slate-200 font-medium rounded-full'>
                JW
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-medium'>John Wick</span>
                <span className='text-gray-500 text-sm'>Customer ID: #{customer?.userId}</span>
              </div>
            </div>
            <div>
              <p>Contact Info</p>
              <div className='text-gray-500 text-sm'>
                <p>Email: {customer?.email}</p>
                <p>Mobile: {customer?.phone}</p>
              </div>
            </div>
          </div>
          <div className='bg-white shadow-md p-4 rounded-lg border space-y-4'>
            <p className='text-lg font-medium'>Detail Order</p>
            <div>
              <p className='mb-2'>ShipTo</p>
              <p className='text-gray-500 text-sm'>{order?.orderInfo.shipTo}</p>
            </div>
            <div>
              <p className='mb-2'>Shipping method</p>
              <p className='text-gray-500 text-sm'>{order?.orderInfo.shippingMethod}</p>
            </div>
            <div>
              <p className='mb-2'>Status</p>
              <Space wrap>
                <Select
                  defaultValue={order?.status}
                  // placeholder='Select status'
                  style={{ width: 370 }}
                  onChange={handleUpdateStatus}
                  options={[
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'CANCELED', label: 'Canceled' },
                    { value: 'DELIVERED', label: 'Delivered' },
                    // { value: 'Yiminghe', label: 'yiminghe' },
                    // { value: 'disabled', label: 'Disabled', disabled: true },
                  ]}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDetailOrder
