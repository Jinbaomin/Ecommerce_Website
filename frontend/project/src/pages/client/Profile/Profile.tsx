import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { TbUserEdit } from "react-icons/tb";
import { BsBasket } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Profile_Info from './Profile_Info';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { GoGift } from "react-icons/go";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Header from '../../../components/client/Header';
import { useUser } from '../../../features/authentication/userUser';

const styledIcon = 'w-7 h-7 object-contain'

const navigation = [
  {
    icon: <TbUserEdit className={styledIcon} />,
    title: 'Personal Info',
    path: 'personal-info'
  },
  {
    icon: <RiMoneyDollarCircleLine className={styledIcon} />,
    title: 'Payment',
    path: 'payment'
  },
  {
    icon: <BsBasket className={styledIcon} />,
    title: 'Order',
    path: 'myOrder'
  },
  {
    icon: <FaRegHeart className={styledIcon} />,
    title: 'Wish List',
    path: 'wish-list'
  },
  {
    icon: <GoGift className={styledIcon} />,
    title: 'Discount',
    path: 'discount'
  },
  {
    icon: <IoSettingsOutline className={styledIcon} />,
    title: 'Setting',
    path: 'setting'
  },
  {
    icon: <AiOutlineSecurityScan className={styledIcon} />,
    title: 'Security & Access',
    path: 'security'
  },
  {
    icon: <CiLogout className={styledIcon} />,
    title: 'Logout',
    path: '/login'
  },
]

const Profile: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2];
  const { data } = useUser();

  return (
    <>
      {/* <div className='flex flex-col min-h-screen'>
        <div className='px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1'>
          <Header /> */}
      <div className='py-10'>
        <div className='flex flex-row gap-1 items-start'>
          <div className='px-3 py-4 bg-[#F9F9F9] border rounded-xl sticky top-3'>
            <div className='flex gap-2 justify-center items-center mb-4'>
              <RxAvatar className='w-10 h-10 object-cover' />
              <p className='text-lg'>{data?.data.user.userName}</p>
            </div>
            <div className='flex flex-col gap-3'>
              {navigation.map((item, index) => (
                <Link to={item.path}>
                  <button key={index} className={`flex gap-2 items-center py-2 px-3 hover:cursor-pointer ${currentPath === item.path && 'bg-blue-300'} rounded-full w-full group`}>
                    {item.icon}
                    <p className={`text-lg font-light ${currentPath === item.path && 'font-medium'}`}>{item.title}</p>
                  </button>
                </Link>
              ))}
            </div>
          </div>
          <div className='p-4 flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}

export default Profile
