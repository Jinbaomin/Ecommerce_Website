import React from 'react'
import Toggle from '../../../ui/Toggle'
import { FaPlus } from "react-icons/fa6";
import { convertCurrency } from '../../../helper/helper'
import { useProducts } from '../../../features/product/useProducts'
import FullPage from '../../../ui/FullPage'
import Spinner from '../../../ui/Spinner'
import { useNavigate } from 'react-router';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import { useDeleteProduct } from '../../../features/product/useDeleteProduct';
import { Pagination, PaginationProps, Select, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

const products = [
  {
    productId: 1,
    productName: 'Macbook pro m1, Apple Silicon M1, 8GB, 256GB SSD, 13.3 inch, Space Gray - 2020 (MYD82SA/A)',
    productCategory: 'Laptop',
    productStock: 200,
    productPrice: 20000000,
    productQty: 200,
    images: [
      'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-2_3d459fa64f614b829d9308de0ae6d3fe_5a34f8ad886444b9971d5f0b275f0dfa_grande.png'
    ]
  },
  {
    productId: 2,
    productName: 'Macbook pro m2',
    productCategory: 'Laptop',
    productStock: 200,
    productPrice: 23000000,
    productQty: 200,
    images: [
      'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-2_3d459fa64f614b829d9308de0ae6d3fe_5a34f8ad886444b9971d5f0b275f0dfa_grande.png'
    ]
  },
  {
    productId: 3,
    productName: 'Macbook pro m3',
    productCategory: 'Laptop',
    productStock: 200,
    productPrice: 27000000,
    productQty: 200,
    images: [
      'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-2_3d459fa64f614b829d9308de0ae6d3fe_5a34f8ad886444b9971d5f0b275f0dfa_grande.png'
    ]
  }
]

const AdminProduct: React.FC = () => {
  const { data, isPending } = useProducts();
  const { deleteProduct, isPending: isPendingDeleteProduct } = useDeleteProduct();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
      searchParams.set('name', search);
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
        <p className='text-center font-bold text-4xl mb-4'>ALL PRODUCT</p>
        <div className='flex justify-end mb-4 px-4'>
          <button onClick={() => navigate('add')} className='text-base text-white font-medium px-3 py-2 bg-blue-500 hover:bg-blue-600 border rounded-2xl flex items-center gap-1'>
            <FaPlus />
            Add Product
          </button>
        </div>
        <div className='py-3 px-4 flex justify-between items-center gap-4'>
          <form onSubmit={handleSubmit(handleSearch)}>
            <label className='text-lg font-medium mr-2'>Search</label>
            <input {...register('search')} type="text" className='border-[1px] border-solid border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 mr-2' placeholder='Search product' />
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
                    searchParams.set('stock', status);
                    return searchParams;
                  })}
                  options={[
                    { value: '', label: 'ALL' },
                    { value: 'in_stock', label: 'In Stock' },
                    { value: 'out_of_stock', label: 'Out Of Stock' }
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
                    { value: 'price,asc', label: 'Sort by ascending price' },
                    { value: 'price,desc', label: 'Sort by descending price' }
                  ]}
                />
              </Space>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-[4fr_2fr_1fr_2fr_1.5fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>PRODUCT</p>
          <p>CATEGORY</p>
          <p>STOCK</p>
          <p>PRICE</p>
          <p>QUANTITY</p>
          <p>ACTION</p>
        </div>
        {
          data?.data?.data.map((product) => (
            <>
              <div key={product.productId} className='grid grid-cols-[4fr_2fr_1fr_2fr_1.5fr_2fr] items-center py-3 px-4'>
                <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14 object-cover' />
                  <p className='line-clamp-1 text-base pe-5'>{product.productName}</p>
                </span>
                <p>{product.category.categoryName}</p>
                <Toggle order={product.productId} checked={product.quantity !== 0} />
                <p className='font-medium'>{convertCurrency(product.price)} VND</p>
                <p className='font-medium'>{product.quantity}</p>
                <div className='flex gap-3'>
                  <div onClick={() => navigate(`${product.productId}/edit`)} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
                    <HiOutlinePencilSquare className='w-6 h-6 group-hover:text-white' />
                  </div>
                  <div onClick={() => deleteProduct({ productId: product.productId })} className={`p-2 hover:bg-red-500 rounded-lg group hover:cursor-pointer ${isPendingDeleteProduct && 'cursor-progress'}`}>
                    <GoTrash className='w-5 h-5 object-contain text-red-500 group-hover:text-white' />
                  </div>
                </div>
              </div>
              <span className='border'></span>
            </>
          ))
        }
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
        {/* <div className='grid grid-cols-[4fr_2fr_1fr_2fr_1fr_2fr] py-3 px-4'>
          <p>Macbook pro m1</p>
          <p>Laptop</p>
          <Toggle />
          <p>{convertCurrency(20000000)}</p>
          <p>200</p>
          <p>Action</p>
        </div>
        <span className='border'></span>
        <div className='grid grid-cols-[4fr_2fr_1fr_2fr_1fr_2fr] py-3 px-4'>
          <p>Macbook pro m1</p>
          <p>Laptop</p>
          <Toggle />
          <p>{convertCurrency(20000000)}</p>
          <p>200</p>
          <p>Action</p>
        </div>
        <span className='border'></span> */}
      </div>
    </div>
  )
}

export default AdminProduct
