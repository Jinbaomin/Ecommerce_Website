import React from 'react'
import { convertCurrency } from '../../helper/helper'

const AdminOrder: React.FC = () => {
  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL ORDER</p>
        <div className='grid grid-cols-[2fr_3fr_4fr_3fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>ORDER ID</p>
          <p>DATE</p>
          <p>CUSTOMER</p>
          <p>TOTAL</p>
          <p>STATUS</p>
          <p>ACTION</p>
        </div>
        <div className='grid grid-cols-[2fr_3fr_4fr_3fr_2fr_2fr] items-center py-3 px-4 text-sm'>
          {/* <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14' />
                  <p className='line-clamp-1 text-base pe-5'>{product.productName}</p>
                </span> */}
          <p>#9087</p>
          <p>2024-12-30 12:30:12</p>
          <div className='flex gap-2'>
            <div className='flex justify-center items-center w-10 h-10 bg-slate-200 font-medium rounded-full'>
              JW
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>John Wick</span>
              <span className='text-gray-500 text-sm'>johnwick@gmail.com</span>
            </div>
          </div>
          <p>{convertCurrency(20000000)} VND</p>
          <p className='text-white font-medium px-2 py-1 bg-cyan-500 w-fit rounded-full'>PENDING</p>
          {/* <p>{product.category.categoryName}</p>
                <Toggle order={product.productId} />
                <p className='font-medium'>{convertCurrency(product.price)} VND</p>
                <p className='font-medium'>{product.quantity}</p> */}
          <p>Action</p>
        </div>
        <span className='border'></span>
      </div>
    </div>
  )
}

export default AdminOrder
