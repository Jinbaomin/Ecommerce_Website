import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router'
import { useGetAllCategory } from '../../../features/category/useGetAllCategory';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { GoTrash } from 'react-icons/go';
import { useDeleteCategory } from '../../../features/category/useDeleteCategory';

const categories = [
  {
    categoryId: 1,
    categoryName: 'Laptop',
    totalProduct: 20
  },
  {
    categoryId: 2,
    categoryName: 'Phone',
    totalProduct: 40
  }
]

const AdminCategory: React.FC = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetAllCategory();
  const { deleteCategory, isPending: isPendingDeleteCategory } = useDeleteCategory();

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL CATEGORIES</p>
        <div className='flex justify-end mb-4 px-4'>
          <button onClick={() => navigate('add')} className='text-base text-white font-medium px-3 py-2 bg-blue-500 hover:bg-blue-600 border rounded-2xl flex items-center gap-1'>
            <FaPlus />
            Add Category
          </button>
        </div>
        <div className='grid grid-cols-[2fr_3fr_2fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>CATEGORIES ID</p>
          <p>CATEGORIES NAME</p>
          <p>CREATED AT</p>
          <p>TOTAL PRODUCT</p>
          <p>ACTION</p>
        </div>
        {
          data?.data.map((item) => (
            <>
              <div key={item.categoryId} className='grid grid-cols-[2fr_3fr_2fr_2fr_2fr] items-center py-3 px-4'>
                {/* <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14' />
                  <p className='line-clamp-1 text-base pe-5'>{product.categoryName}</p>
                </span> */}
                <p>#{item.categoryId}</p>
                <p>{item.categoryName}</p>
                <p>{item.createdAt}</p>
                <p>{item.products.length}</p>
                <div className='flex gap-3'>
                  <div onClick={() => navigate(`${item.categoryId}/edit`)} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
                    <HiOutlinePencilSquare className='w-6 h-6 group-hover:text-white' />
                  </div>
                  <div onClick={() => deleteCategory({ categoryId: item.categoryId })} className={`p-2 hover:bg-red-500 rounded-lg group hover:cursor-pointer ${isPendingDeleteCategory && 'cursor-progress'}`}>
                    <GoTrash className='w-5 h-5 object-contain text-red-500 group-hover:text-white' />
                  </div>
                </div>
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

export default AdminCategory
