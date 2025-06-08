import React, { useEffect } from 'react'
import { IoArrowBack, IoKeyOutline } from 'react-icons/io5'
import { FaEyeSlash, FaRegEye, FaRegHeart } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router'
import { convertCurrency, convertFullNameShorten, extractFirstWordOfName } from '../../../helper/helper';
import { Pagination, Tabs } from 'antd';
import type { PaginationProps, TabsProps } from 'antd';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useGetOrderByUserId } from '../../../features/order/useGetOrderByUserId';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetPassword } from '../../../features/authentication/useResetPassword';
import { useGetUserById } from '../../../features/user/useGetUserById';

const colorStatus = {
  'PENDING': 'bg-blue-500',
  'DELIVERED': 'bg-green-500',
  'CANCELED': 'bg-red-500'
}

interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}


const AdminDetailCustomer = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: order, isPending } = useGetOrderByUserId();
  const [showPassword, setShowPassword] = React.useState(false);
  const { resetPassword, isPending: isPendingResetPassword, isSuccess: isSuccessResetPassword } = useResetPassword();
  const { data: customer, isPending: isPendingGetCustomer } = useGetUserById();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handlShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IResetPassword>({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    // console.log(current, pageSize);
    setSearchParams({ page: current, limit: pageSize });
  };

  const handleSubmitInput: SubmitHandler<IResetPassword> = ({ newPassword }) => {
    resetPassword({ email: customer?.data.email, newPassword });
  }

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    if (isSuccessResetPassword && isPendingResetPassword) {
      reset();
    }
  }, [isSuccessResetPassword, isPendingResetPassword]);

  if (isPendingGetCustomer) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <button className='px-2 py-1 focus:bg-violet-500 rounded-lg focus:text-white w-[120px] flex gap-1 justify-center items-center font-medium text-base'><CiLock className='w-5 h-5' /> Security</button>,
      children: (
        <>
          <form onSubmit={handleSubmit(handleSubmitInput)} className='flex flex-col gap-3 p-4'>
            <h1 className='text-3xl text-center font-semibold'>Reset Password</h1>
            <div>
              <label className='pl-3 text-base mb-1'>New Password</label>
              <div className='relative'>
                <input {...register('newPassword', {
                  required: 'This field is required',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: 'At least 8 characters, one letter, one number and one special character'
                  }
                })} type={showNewPassword ? 'text' : 'password'} placeholder='New password' className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 pl-9 border pe-3 py-3 w-full' />
                <IoKeyOutline className='absolute top-3 left-3' />
                {
                  showNewPassword ? (
                    <FaEyeSlash onClick={handlShowNewPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                  ) : (
                    <FaRegEye onClick={handlShowNewPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                  )
                }
                {errors?.newPassword && <p className='text-sm text-red-500 pl-3'>{errors.newPassword.message}</p>}
              </div>
            </div>

            <div>
              <label className='pl-3 text-base mb-1'>Password Confirm</label>
              <div className='relative'>
                <input {...register('confirmPassword', {
                  required: 'This field is required',
                  validate: (value) => value === watch('newPassword') || 'The password confirm do not match'
                })} type={showConfirmPassword ? 'text' : 'password'} placeholder='Password Confirm' className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                <IoKeyOutline className='absolute top-3 left-3' />
                {
                  showConfirmPassword ? (
                    <FaEyeSlash onClick={handleShowConfirmPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                  ) : (
                    <FaRegEye onClick={handleShowConfirmPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                  )
                }
                {errors?.confirmPassword && <p className='text-sm text-red-500 pl-3'>{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <div className='flex justify-end items-center'>
              <button className='flex justify-center items-center mt-2 py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full focus:outline-none'>
                {isPendingResetPassword ? (
                  <>
                    <Spinner size={15} />
                    <p>Loading...</p>
                  </>
                ) : (
                  <p>Change</p>
                )}
              </button>
            </div>
          </form>
        </>
      ),
    },
    {
      key: '2',
      label: <button className='px-2 py-1 focus:bg-sky-500 rounded-lg focus:text-white w-[120px] flex gap-2 justify-center items-center font-medium text-base'><IoBagCheckOutline className='w-5 h-5' /> Orders</button>,
      children: (
        <>
          {isPending ? (
            <FullPage>
              <Spinner size={50} />
            </FullPage>
          ) : (
            <>
              <div className='grid grid-cols-[2fr_3fr_3fr_2fr_2fr] py-3 px-4 bg-slate-100 text-base font-semibold'>
                <p>ORDER ID</p>
                <p>DATE</p>
                <p>TOTAL</p>
                <p>STATUS</p>
                <p>ACTION</p>
              </div>
              {order?.data.data.map(order => (
                <>
                  <div className='grid grid-cols-[2fr_3fr_3fr_2fr_2fr] items-center py-3 px-4 text-sm'>
                    <p>#{order.orderId}</p>
                    <p>{order.createdAt}</p>
                    <p className='font-medium'>{convertCurrency(order.total)} VND</p>
                    <p className={`text-white font-medium px-2 py-1 w-[90px] ${colorStatus[order.status]} rounded-full flex justify-center items-center`}>{order.status}</p>
                    <div>
                      <div onClick={() => navigate(`/admin/order/${order.orderId}`)} className='hover:bg-sky-500 p-2 w-fit rounded-lg hover:cursor-pointer group'>
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
                  defaultCurrent={Number(page)}
                  defaultPageSize={Number(pageSize)}
                  total={order?.data?.meta?.total}
                />
              </div>
            </>
          )}
        </>
      ),
    }
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-xl hover:bg-sky-200 mb-3'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      <p className='text-xl mx-3 mb-3'>Customer ID <span>#{customer?.data.userId}</span></p>
      <div className='grid grid-cols-[3fr_6fr] items-start gap-4'>
        <div className='border shadow-md bg-white px-4 pt-4 rounded-lg'>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <p className='w-32 h-32 bg-slate-200 rounded-full flex justify-center items-center text-4xl font-semibold'>{extractFirstWordOfName('John Wick')}</p>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-lg font-medium'>{customer?.data.fullName}</p>
              <p className=''>Created at: <span className='text-gray-500'>{customer?.data.createdDate}</span></p>
            </div>
          </div>
          <p className='py-3 text-lg'>Detail</p>
          <hr />
          <div className='py-3 space-y-1'>
            <p>Username: <span className='text-gray-600'>{customer?.data.userName}</span></p>
            <p>Email: <span className='text-gray-600'>{customer?.data.email}</span></p>
            <p>Status: <span className='text-blue-600 font-semibold'>Active</span>s</p>
            <p>Role: <span className='text-gray-600 font-semibold'>{customer?.data.roles[0]}</span></p>
            <p>Phone: <span className='text-gray-600'>{customer?.data.phone}</span></p>
          </div>
        </div>
        <div className='border shadow-md bg-white px-4 pt-4 rounded-lg mr-5'>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default AdminDetailCustomer
