import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { product } from '../../../assets/asset'
import { useUser } from '../../../features/authentication/userUser';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { useDeleteProductFromWishList } from '../../../features/wishlist/useDeleteProductFromWishList';
import { Link, useNavigate } from 'react-router-dom';
import { useAddProductToCart } from '../../../features/cart/useAddProductToCart';

const Profile_WishList: React.FC = () => {
  const { data, isFetching, isPending: isPendingUser } = useUser();
  const { deleteProductFromWishList } = useDeleteProductFromWishList();
  const { addProductToCart, isPending } = useAddProductToCart();
  const navigate = useNavigate();

  if (isPendingUser) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const handleDeleteProductFromWishList = (e: any, productId: string) => {
    e.stopPropagation();
    deleteProductFromWishList({ productId });
  }

  const handAddProductToCart = (e: any, productId: string) => {
    e.stopPropagation();
    addProductToCart({ productId });
  }

  return (
    <div>
      <div className='mb-5'>
        <p className='font-medium text-xl mb-2'>Wish List</p>
        <p className='font-light'>See your favorites list here</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {data?.data.user.wishList.map(product => (
          <div onClick={() => navigate(`/products/${product.productId}`)} className='border hover:shadow-lg flex flex-col gap-2 rounded-xl pt-2 px-2 hover:cursor-pointer'>
            <div className='flex justify-center items-center'>
              <img src={product.images[0]} alt='mobile' className='w-36 h-36 object-contain' />
            </div>
            <div className='flex justify-center'>
              <div className='border w-3/4 flex'></div>
            </div>
            <p className='text-sm line-clamp-2 text-center'>{product.productName}</p>
            <div className='flex items-center justify-between p-3'>
              <div onClick={(e) => handAddProductToCart(e, product.productId)} className='flex gap-2 items-center border-2 border-blue-500 text-blue-500 py-[5px] px-[9px] rounded-xl hover:cursor-pointer hover:bg-blue-500 hover:text-white'>
                <FiShoppingCart className='w-5 h-5 object-cover hover:cursor-pointer' />
                <p className='text-xs'>Add to cart</p>
              </div>
              <div onClick={(e) => handleDeleteProductFromWishList(e, product.productId)} className='p-2 hover:bg-red-500 rounded-full group hover:cursor-pointer'>
                <GoTrash className='w-5 h-5 object-contain text-red-500 group-hover:text-white' />
              </div>
            </div>
          </div>
        ))}
        {/* <div className='border hover:shadow-lg flex flex-col gap-2 rounded-xl'>
          <div className='flex justify-center items-center'>
            <img src={product.Iphone} alt='mobile' className='w-40 h-40 object-contain' />
          </div>
          <div className='flex justify-center'>
            <div className='border w-3/4 flex'></div>
          </div>
          <p className='text-xs text-center'>Iphone 12 Pro Max</p>
          <div className='flex items-center justify-between p-3'>
            <div className='flex gap-2 items-center border-2 border-blue-500 text-blue-500 py-[5px] px-[9px] rounded-xl hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500'>
              <FiShoppingCart className='w-5 h-5 object-cover hover:cursor-pointer' />
              <p className='text-xs'>Add to cart</p>
            </div>
            <GoTrash className='w-5 h-5 object-contain text-red-500 hover:cursor-pointer' />
          </div>
        </div>
        <div className='border hover:shadow-lg flex flex-col gap-2 rounded-xl'>
          <div className='flex justify-center items-center'>
            <img src={product.Iphone} alt='mobile' className='w-40 h-40 object-contain' />
          </div>
          <div className='flex justify-center'>
            <div className='border w-3/4 flex'></div>
          </div>
          <p className='text-xs text-center'>Iphone 12 Pro Max</p>
          <div className='flex items-center justify-between p-3'>
            <div className='flex gap-2 items-center border-2 border-blue-500 text-blue-500 py-[5px] px-[9px] rounded-xl hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500'>
              <FiShoppingCart className='w-5 h-5 object-cover hover:cursor-pointer' />
              <p className='text-xs'>Add to cart</p>
            </div>
            <GoTrash className='w-5 h-5 object-contain text-red-500 hover:cursor-pointer' />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Profile_WishList
