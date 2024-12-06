import React from 'react'
import Toggle from '../../../ui/Toggle'
import { FaPlus } from "react-icons/fa6";
import { convertCurrency } from '../../../helper/helper'
import { useProducts } from '../../../features/product/useProducts'
import FullPage from '../../../ui/FullPage'
import Spinner from '../../../ui/Spinner'
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

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
        <div className='grid grid-cols-[4fr_2fr_1fr_2fr_1fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>PRODUCT</p>
          <p>CATEGORY</p>
          <p>STOCK</p>
          <p>PRICE</p>
          <p>QUANTITY</p>
          <p>ACTION</p>
        </div>
        {
          data?.data.map((product) => (
            <>
              <div key={product.productId} className='grid grid-cols-[4fr_2fr_1fr_2fr_1fr_2fr] items-center py-3 px-4'>
                <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14' />
                  <p className='line-clamp-1 text-base pe-5'>{product.productName}</p>
                </span>
                <p>{product.category.categoryName}</p>
                <Toggle order={product.productId} />
                <p className='font-medium'>{convertCurrency(product.price)} VND</p>
                <p className='font-medium'>{product.quantity}</p>
                <p>Action</p>
              </div>
              <span className='border'></span>
            </>
          ))
        }
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
