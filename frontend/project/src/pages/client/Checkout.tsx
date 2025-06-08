import React, { useState } from 'react'
import { asset, cart } from '../../assets/asset'
import Spinner from '../../ui/Spinner';
import { useUser } from '../../features/authentication/userUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { convertCurrency } from '../../helper/helper';
import { useMyCart } from '../../features/cart/useMyCart';
import FullPage from '../../ui/FullPage';
import { useCheckOut } from '../../features/order/useCheckOut';

const shippingMethods = [
  {
    name: 'Free Shipping',
    duration: '7-30 business days',
    price: 0
  },
  {
    name: 'Regular Shipping',
    duration: '7-30 business days',
    price: 20000
  },
  {
    name: 'Express Shipping',
    duration: '7-30 business days',
    price: 30000
  }
]

interface IFormCheckOut {
  user: string;
  shipTo: string;
}

const Checkout: React.FC = () => {
  const { checkout, isPending } = useCheckOut();
  const { data } = useUser();
  const { data: myCart, isPending: pendingCart } = useMyCart();
  const [costShippingMethod, setCostShippingMethod] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<string>('Free Shipping');
  const { register, watch, handleSubmit } = useForm<IFormCheckOut>({
    defaultValues: {
      user: data?.data.user.fullName,
      shipTo: ''
    }
  });

  const total = myCart?.data.total || 0 + costShippingMethod;

  if (isPending || pendingCart) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const handleCheckOut: SubmitHandler<IFormCheckOut> = (data) => {
    checkout({total, shipTo: data.shipTo, shippingMethod})
  }

  return (
    <div className='py-16'>
      <div className='flex items-start gap-8'>
        <div className='sticky top-4 space-y-6 px-4 flex-1 py-3 border rounded-lg'>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium pl-2'>User</label>
            <form className='relative'>
              <input {...register('user')} type='text' className='bg-[#F6F6F6] focus:outline-none focus:ring-2 px-3 py-2 rounded-lg w-full' />
              <button className='hover:cursor-pointer'>
                <img src={asset.edit} className='w-5 h-5 object-cover outline-none focus:outline-none absolute top-2 right-2' />
              </button>
            </form>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium pl-2'>Ship to</label>
            <div className='relative'>
              <input {...register('shipTo')} type='text' className='bg-[#F6F6F6] focus:outline-none focus:ring-2 px-3 py-2 rounded-lg w-full' />
              <button className='hover:cursor-pointer'>
                <img src={asset.edit} className='w-5 h-5 object-cover outline-none focus:outline-none absolute top-2 right-2' />
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-lg font-medium pl-2'>Ship Method</label>
            <div className='space-y-2'>
              {shippingMethods.map(method => (
                <div className='bg-[#F9F9F9] flex items-center gap-3 rounded-lg py-2 px-3'>
                  <input onChange={(e) => (
                    setCostShippingMethod(parseInt(e.target.value)),
                    setShippingMethod(method.name)
                  )} type='radio' id={method.name} name='shippingmethod' value={method.price} className='w-4 h-4' checked={costShippingMethod === method.price} />
                  <div className='flex flex-col gap-2 text-xs flex-1'>
                    <label htmlFor={method.name} className='text-sm hover:cursor-pointer'>{method.name}</label>
                    <div className='flex justify-between items-center font-light'>
                      <p>{method.duration}</p>
                      <p>{convertCurrency(method.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className='bg-[#F9F9F9] flex items-center gap-3 rounded-lg py-2 px-3'>
                <input type='radio' id='method1' name='shippingmethod' value={0} className='w-4 h-4' />
                <div className='flex flex-col gap-2 text-xs flex-1'>
                  <label htmlFor='method1' className='text-sm hover:cursor-pointer'>Free Shipping</label>
                  <div className='flex justify-between items-center font-light'>
                    <p>7-30 business days</p>
                    <p>{convertCurrency(0)}</p>
                  </div>
                </div>
              </div>
              <div className='bg-[#F9F9F9] flex items-center gap-3 rounded-lg py-2 px-3'>
                <input type='radio' id='method2' name='shippingmethod' value={20000} className='w-4 h-4' />
                <div className='flex flex-col gap-2 text-xs flex-1'>
                  <label htmlFor='method2' className='text-sm hover:cursor-pointer'>Regular Shipping</label>
                  <div className='flex justify-between items-center font-light'>
                    <p>7-30 business days</p>
                    <p>{convertCurrency(20000)}</p>
                  </div>
                </div>
              </div>
              <div className='bg-[#F9F9F9] flex items-center gap-3 rounded-lg py-2 px-3'>
                <input type='radio' id='method3' name='shippingmethod' value={30000} className='w-4 h-4' />
                <div className='flex flex-col gap-2 text-xs flex-1'>
                  <label htmlFor='method3' className='text-sm hover:cursor-pointer'>Express Shipping</label>
                  <div className='flex justify-between items-center font-light'>
                    <p>7-30 business days</p>
                    <p>{convertCurrency(30000)}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleCheckOut)} className='flex flex-col px-4 py-3 border rounded-lg w-[38%] space-y-4'>
          <p className='text-lg font-medium'>Your Order</p>
          <div className='flex flex-col gap-2'>
            {myCart?.data.cartItems.map(item => (
              <>
                <div className='flex items-center gap-2'>
                  <img src={item.product.images[0]} className='w-20 h-20' />
                  <div className='flex flex-col w-full justify-between text-xs'>
                    <p className='text-base line-clamp-1 font-light'>{item.product.productName}</p>
                    <p className='text-sm'>x{item.quantity}</p>
                    <div className='flex justify-end text-sm'>
                      <p>{convertCurrency(item.total)}</p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
            {/* <div className='flex items-center gap-2'>
              <img src={cart.imgCart} className='w-16 h-16' />
              <div className='flex flex-col w-full justify-between text-xs'>
                <p className='text-base line-clamp-1 font-light'>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</p>
                <p>x1</p>
                <div className='flex justify-end text-sm'>
                  <p>$433.00</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='flex items-center gap-2'>
              <img src={cart.img1Cart} className='w-16 h-16' />
              <div className='flex flex-col w-full justify-between text-xs'>
                <p className='text-base line-clamp-1 font-light'>Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air</p>
                <p>x1</p>
                <div className='flex justify-end text-sm'>
                  <p>0</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='flex items-center gap-2'>
              <img src={cart.img1Cart} className='w-16 h-16' />
              <div className='flex flex-col w-full justify-between text-xs'>
                <p className='text-base line-clamp-1 font-light'>Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air</p>
                <p>x1</p>
                <div className='flex justify-end text-sm'>
                  <p>$433.00</p>
                </div>
              </div>
            </div>
            <hr /> */}
          </div>
          <div className='flex items-center gap-2 my-3'>
            <input type='text' className='border text-sm px-3 py-2 focus:outline-none focus:ring-2 rounded-lg' placeholder='Discount Code' />
            <button className='px-3 py-2 text-white border w-full rounded-lg text-sm bg-blue-500 hover:bg-blue-600 transition-colors duration-[800]'>Apply</button>
          </div>
          <div className='space-y-3 text-base font-light'>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <p>Subtotal: </p>
                <p className='font-medium'>{convertCurrency(myCart?.data.total || 0)}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Discount: </p>
                <p className='font-medium'>0</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Shipping: </p>
                <p className='font-medium'>{convertCurrency(costShippingMethod)}</p>
              </div>
            </div>
            <hr />
            <div className='font-semibold text-lg flex justify-between items-center'>
              <p>Grand Total: </p>
              <p>{convertCurrency(total)}</p>
            </div>
          </div>
          <button className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white text-base flex justify-center gap-2'>
            {isPending ? (
              <>
                <Spinner size={20} />
                <p>Loading...</p>
              </>
            ) : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
