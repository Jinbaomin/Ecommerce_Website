import React from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { convertCurrency, convertFullNameShorten, extractFirstWordOfName } from '../../../helper/helper'
import { useNavigate } from 'react-router'
import { useGetAllUser } from '../../../features/user/useGetAllUser'
import FullPage from '../../../ui/FullPage'
import Spinner from '../../../ui/Spinner'

const AdminCustomer = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetAllUser();

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL ORDER</p>
        <div className='grid grid-cols-[3fr_4fr_2fr_3fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>CUSTOMER ID</p>
          <p>CUSTOMER</p>
          <p>ROLE</p>
          <p>STATUS</p>
          <p>ACTION</p>
        </div>
        {data?.data.map(user => (
          <>
            <div className='grid grid-cols-[3fr_4fr_2fr_3fr_2fr_2fr] items-center py-3 px-4 text-sm'>
              <p className='font-semibold'>#{user.userId}</p>
              <div className='flex gap-2'>
                <div className='flex justify-center items-center w-10 h-10 bg-slate-200 font-medium rounded-full'>
                  {extractFirstWordOfName(user.fullName)}
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-medium'>{convertFullNameShorten(user.fullName)}</span>
                  <span className='text-gray-500 text-sm'>{user.email}</span>
                </div>
              </div>
              <p className='font-medium'>{user.roles[0]}</p>
              <p className='font-medium w-[85px] flex justify-center items-center px-2 py-1 bg-green-500 text-white rounded-xl cursor-pointer'>ACTIVE</p>
              <div>
                <div onClick={() => navigate(`${user.userId}`)} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
                  <HiOutlinePencilSquare className='w-6 h-6 group-hover:text-white' />
                </div>
              </div>
            </div>
            <span className='border'></span>
          </>
        ))}
        {/* <div className='grid grid-cols-[3fr_4fr_2fr_3fr_2fr_2fr] items-center py-3 px-4 text-sm'>
          <p className='font-semibold'>#233</p>
          <div className='flex gap-2'>
            <div className='flex justify-center items-center w-10 h-10 bg-slate-200 font-medium rounded-full'>
              JW
            </div>
            <div className='flex flex-col gap-1'>
              <span className='font-medium'>John Wick</span>
              <span className='text-gray-500 text-sm'>johnwick@gmail.com</span>
            </div>
          </div>
          <p className='font-medium'>ADMIN</p>
          <p className='font-medium w-[85px] flex justify-center items-center px-2 py-1 bg-gray-500 text-white rounded-xl cursor-pointer'>INACTIVE</p>
          <div>
            <div onClick={() => navigate('2')} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
              <HiOutlinePencilSquare className='w-6 h-6 group-hover:text-white' />
            </div>
          </div>
        </div>
        <span className='border'></span> */}
        {/* <div className='py-3 px-4'>
          <Pagination
            align='end'
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '30', '40']}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={page}
            defaultPageSize={pageSize}
            total={data?.data.meta.total}
          />
        </div> */}
      </div>
    </div>
  )
}

export default AdminCustomer
