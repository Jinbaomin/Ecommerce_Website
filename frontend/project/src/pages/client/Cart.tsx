import React from 'react'
import { cart } from '../../assets/asset'
import { GoTrash } from "react-icons/go";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useMyCart } from '../../features/cart/useMyCart';
import FullPage from '../../ui/FullPage';
import Spinner from '../../ui/Spinner';
import { convertCurrency } from '../../helper/helper';
import { useUpdateCartItem } from '../../features/cart/useUpdateCartItem';
import { useDeleteCartItem } from '../../features/cart/useDeleteCartItem';

const Cart: React.FC = () => {
  const [amount, setAmount] = React.useState(1);
  const navigate = useNavigate();
  const { data, isPending } = useMyCart();
  const { updateCartItem } = useUpdateCartItem();
  const { deleteCartItem } = useDeleteCartItem();

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  return (
    <div className='py-20'>
      <div className='grid grid-cols-[2fr_1fr] gap-40 items-start'>
        <div className='flex flex-col gap-4'>
          {data?.data.cartItems.length === 0 && (
            <p className='text-center text-lg font-medum'>You don't have any products in your cart</p>
          )}
          {data?.data.cartItems.length > 0 && (
            data?.data.cartItems.map((item) => (
              <div className='grid grid-cols-[auto_1fr] gap-5 hover:shadow-lg border rounded-lg p-3'>
                <img className='w-36 h-36' src={item.product.images[0]} />
                <div className='flex flex-col justify-between gap-2 hover:cursor-pointer'>
                  <p className='font-medium'>{item.product.productName}</p>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-center'>
                      <img src={cart.truck} className='w-4 h-4' />
                      <p className='text-sm font-light'>Free Delivery</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <img src={cart.verify} className='w-4 h-4' />
                      <p className='text-sm font-light'>Guaranteed</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <img src={cart.instock} className='w-4 h-4' />
                      <p className='text-sm font-light'>In stock</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-lg font-normal text-red-500'>{convertCurrency(item.product.salePrice ? item.product.salePrice : item.product.price)}</p>
                    <div className='flex flex-1 justify-end'>
                      <button className='hover:cursor-pointer flex items-center'>
                        <div className='w-10 flex gap-3 items-center'>
                          <button onClick={() => updateCartItem({ cartItemId: item.id, quantity: -1 })}>
                            <CiCircleMinus className='w-6 h-6' />
                          </button>
                          {/* <input type='text' className='w-6 flex justify-center' value={item.quantity} /> */}
                          <p>{item.quantity}</p>
                          <button onClick={() => updateCartItem({ cartItemId: item.id, quantity: 1 })}>
                            <CiCirclePlus className='w-6 h-6' />
                          </button>
                        </div>
                        <button className='ml-16' onClick={() => deleteCartItem({ cartItemId: item.id })}>
                          <GoTrash className='text-red-500 text-xl' />
                        </button>
                      </button>
                      {/* <div className='flex gap-3'>
                        <button className='hover:cursor-pointer' onClick={() => setAmount(amount > 1 ? amount - 1 : amount)}>-</button>
                        <span className='text-lg'>{amount}</span>
                        <button className='hover:cursor-pointer' onClick={() => setAmount(amount + 1)} >+</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* <div className='grid grid-cols-[auto_1fr] gap-5 shadow-md border rounded-lg p-3'>
            <img className='w-36 h-36' src={cart.imgCart} />
            <div className='flex flex-col justify-between'>
              <p className='font-medium'>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</p>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <img src={cart.truck} className='w-4 h-4' />
                  <p className='text-sm font-light'>Free Delivery</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <img src={cart.verify} className='w-4 h-4' />
                  <p className='text-sm font-light'>Guaranteed</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <img src={cart.instock} className='w-4 h-4' />
                  <p className='text-sm font-light'>In stock</p>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='text-lg font-normal'>$433.00</p>
                <div className='flex gap-3'>
                  <button className='hover:cursor-pointer'>
                    <GoTrash className='text-red-500 text-xl' />
                  </button>
                  <div className='flex gap-3'>
                    <button className='hover:cursor-pointer' onClick={() => setAmount(amount > 1 ? amount - 1 : amount)}>-</button>
                    <span className='text-lg'>{amount}</span>
                    <button className='hover:cursor-pointer' onClick={() => setAmount(amount + 1)} >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[auto_1fr] gap-5 shadow-md border rounded-lg p-3'>
            <img className='w-36 h-36' src={cart.img1Cart} />
            <div className='flex flex-col justify-between'>
              <p className='font-medium'>Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air</p>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <img src={cart.truck} className='w-4 h-4' />
                  <p className='text-sm font-light'>Free Delivery</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <img src={cart.verify} className='w-4 h-4' />
                  <p className='text-sm font-light'>Guaranteed</p>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='text-lg font-normal'>$433.00</p>
                <div className='flex gap-3'>
                  <button className='hover:cursor-pointer'>
                    <GoTrash className='text-red-500 text-xl' />
                  </button>
                  <div className='flex gap-3'>
                    <button className='hover:cursor-pointer' onClick={() => setAmount(amount > 1 ? amount - 1 : amount)}>-</button>
                    <span className='text-lg'>{amount}</span>
                    <button className='hover:cursor-pointer' onClick={() => setAmount(amount + 1)} >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className='p-3 border flex-1 bg-[#F9F9F9] flex flex-col gap-4 rounded-lg'>
          <p className='text-xl font-medium'>Payment Details</p>
          <div className='space-y-3 text-lg'>
            <div>
              <div className='flex justify-between items-center'>
                <p>Subtotal: </p>
                <p>{convertCurrency(data?.data.total)}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Discount: </p>
                <p>0</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Shipping: </p>
                <p>0</p>
              </div>
            </div>
            <hr />
            <div className='font-medium flex justify-between items-center'>
              <p>Grand Total: </p>
              <p className='font-semibold text-red-500'>{convertCurrency(data?.data.total)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/checkout')} className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white text-xl'>Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
