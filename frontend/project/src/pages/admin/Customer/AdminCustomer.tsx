import React from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { convertCurrency, convertFullNameShorten, extractFirstWordOfName } from '../../../helper/helper'
import { useNavigate } from 'react-router'
import { useGetAllUser } from '../../../features/user/useGetAllUser'
import FullPage from '../../../ui/FullPage'
import Spinner from '../../../ui/Spinner'
import { Pagination, PaginationProps } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

const AdminCustomer = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useGetAllUser();
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: {
      search: ''
    }
  });


  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    // console.log(current, pageSize);
    setSearchParams(searchParams => {
      searchParams.set('page', current.toString());
      searchParams.set('limit', pageSize.toString());
      return searchParams;
    });
  };

  const handleSearch: SubmitHandler<{ search: string }> = ({ search }) => {
    setSearchParams(searchParams => {
      searchParams.set('search', search);
      return searchParams;
    });
  }

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL CUSTOMER</p>
        <div className='py-3 px-4 flex justify-between items-center gap-4'>
          <form onSubmit={handleSubmit(handleSearch)}>
            <label className='text-lg font-medium mr-2'>Search</label>
            <input {...register('search')} type="text" className='border-[1px] border-solid border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 mr-2' placeholder='Search customer' />
            <button className='px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>Search</button>
          </form>
          {/* <div className='flex gap-4'>
            <div>
              <label className='text-lg font-medium mr-2'>Filter</label>
              <Space wrap>
                <Select
                  defaultValue={'ALL'}
                  // placeholder='Select status'
                  style={{ width: 250 }}
                  onChange={(status) => setSearchParams(searchParams => {
                    searchParams.set('status', status);
                    return searchParams;
                  })}
                  options={[
                    { value: '', label: 'ALL' },
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'CANCELED', label: 'Canceled' },
                    { value: 'DELIVERED', label: 'Delivered' }
                  ]}
                />
              </Space>
            </div>
            <div>
              <label className='text-lg font-medium mr-2'>Sort By</label>
              <Space wrap>
                <Select
                  defaultValue={'Default'}
                  // placeholder='Select status'
                  style={{ width: 250 }}
                  onChange={(sortedBy) => setSearchParams(searchParams => {
                    searchParams.set('sortedBy', sortedBy);
                    return searchParams;
                  })}
                  options={[
                    { value: 'createdAt,desc', label: 'Sort by latest order' },
                    { value: 'createdAt,asc', label: 'Sort by oldest order' },
                    { value: 'total,asc', label: 'Sort by ascending total' },
                    { value: 'total,desc', label: 'Sort by descending total' }
                  ]}
                />
              </Space>
            </div>
          </div> */}
        </div>
        <div className='grid grid-cols-[3fr_4fr_2fr_3fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>CUSTOMER ID</p>
          <p>CUSTOMER</p>
          <p>ROLE</p>
          <p>STATUS</p>
          <p>ACTION</p>
        </div>
        {data?.data.data.map(user => (
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
        <div className='py-3 px-4'>
          <Pagination
            align='end'
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '30', '40']}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={Number(page)}
            defaultPageSize={Number(pageSize)}
            total={data?.data?.meta?.total}
          />
        </div>
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
