import React from 'react'
import { convertCurrency } from '../../../helper/helper'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useNavigate, useParams } from 'react-router';
import { useAllOrder } from '../../../features/order/useAllOrder';
import type { PaginationProps } from 'antd';
import { Pagination, Select, Space } from 'antd';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

const colorStatus = {
  'PENDING': 'bg-blue-500',
  'DELIVERED': 'bg-green-500',
  'CANCELED': 'bg-red-500'
}

const AdminOrder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending, isFetching } = useAllOrder();
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: {
      search: ''
    }
  });

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  console.log(data);

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
      searchParams.set('searchByEmail', search);
      return searchParams;
    });
  }

  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL ORDER</p>
        <div className='py-3 px-4 flex justify-between items-center gap-4'>
          <form onSubmit={handleSubmit(handleSearch)}>
            <label className='text-lg font-medium mr-2'>Search</label>
            <input {...register('search')} type="text" className='border-[1px] border-solid border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 mr-2' placeholder='Search order by email' />
            <button className='px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>Search</button>
          </form>
          <div className='flex gap-4'>
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
          </div>
        </div>
        <div className='grid grid-cols-[2fr_3fr_4fr_3fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>ORDER ID</p>
          <p>DATE</p>
          <p>CUSTOMER</p>
          <p>TOTAL</p>
          <p>STATUS</p>
          <p>ACTION</p>
        </div>
        {data?.data === null && <p className='text-center text-lg font-medium py-4'>No order found</p>}
        {data?.data?.data?.map(order => (
          <>
            <div className='grid grid-cols-[2fr_3fr_4fr_3fr_2fr_2fr] items-center py-3 px-4 text-sm'>
              {/* <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14' />
                  <p className='line-clamp-1 text-base pe-5'>{product.productName}</p>
                </span> */}
              <p>#{order.orderId}</p>
              <p>{order.createdAt}</p>
              <div className='flex gap-2'>
                <div className='flex justify-center items-center w-10 h-10 bg-slate-200 font-medium rounded-full'>
                  {order.user.fullName.split(' ')[0][0] + order.user.fullName.split(' ')[order.user.fullName.split(' ').length - 1][0]}
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='font-medium'>{
                    order.user.fullName.split(' ')[0] + ' ' + order.user.fullName.split(' ')[order.user.fullName.split(' ').length - 1]
                  }</span>
                  <span className='text-gray-500 text-sm'>{order.user.email}</span>
                </div>
              </div>
              <p className='font-medium'>{convertCurrency(order.total)} VND</p>
              <p className={`text-white font-medium px-2 py-1 ${colorStatus[order.status]} w-[90px] rounded-full flex justify-center items-center`}>{order.status}</p>
              {/* <p>{product.category.categoryName}</p>
                <Toggle order={product.productId} />
                <p className='font-medium'>{convertCurrency(product.price)} VND</p>
                <p className='font-medium'>{product.quantity}</p> */}
              <div>
                <div onClick={() => navigate(`${order.orderId}`)} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
                  <HiOutlinePencilSquare className='w-6 h-6 group-hover:text-white' />
                </div>
              </div>
            </div>
            <div className='border'></div>
          </>
        ))}
        <div className='py-3 px-4'>
          <Pagination
            align='end'
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '30', '40']}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={page}
            defaultPageSize={pageSize}
            total={data?.data?.meta?.total}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminOrder
