import React from 'react'

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
  return (
    <div className='bg-white py-4 rounded-xl w-[96%] mr-auto border-[1px] border-solid shadow-md'>
      <div className='flex flex-col'>
        <p className='text-center font-bold text-4xl mb-4'>ALL CATEGORIES</p>
        <div className='grid grid-cols-[2fr_4fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
          <p>CATEGORIES ID</p>
          <p>CATEGORIES NAME</p>
          <p>TOTAL PRODUCT</p>
          <p>ACTION</p>
        </div>
        {
          categories.map((product) => (
            <>
              <div key={product.categoryId} className='grid grid-cols-[2fr_4fr_2fr_2fr] items-center py-3 px-4'>
                {/* <span className='flex items-center gap-3'>
                  <img src={product.images[0]} alt="" className='w-14 h-14' />
                  <p className='line-clamp-1 text-base pe-5'>{product.categoryName}</p>
                </span> */}
                <p>{product.categoryId}</p>
                <p>{product.categoryName}</p>
                <p>{product.totalProduct}</p>
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

export default AdminCategory
