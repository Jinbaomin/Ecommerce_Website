import React from 'react'
import { asset } from '../../assets/asset';
import { MdOutlineDashboard } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router'
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { CiLogout, CiSearch } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { TbUserEdit } from 'react-icons/tb';
import { MdOutlineCategory } from "react-icons/md";
import { useLogout } from '../../features/authentication/useLogout';
import { BsBagCheck } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";

const navigationBars = [
  {
    icon: <MdOutlineDashboard className='w-6 h-6' />,
    title: 'Dashboard',
    path: 'dashboard'
  },
  {
    icon: <FaRegUser className='w-6 h-6' />,
    title: 'Customer',
    path: 'customer'
  },
  {
    icon: <BsBoxSeam className='w-6 h-6' />,
    title: 'Product',
    path: 'product'
  },
  {
    icon: <MdOutlineCategory  className='w-6 h-6' />,
    title: 'Category',
    path: 'category'
  },
  {
    icon: <BsBagCheck className='w-6 h-6' />,
    title: 'Order',
    path: 'order'
  }
]

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const { logout, isPending } = useLogout();

  const currentPath = window.location.pathname.split('/')[2];

  const handleLogOut = (e?: Event) => {
    // e?.preventDefault();
    logout();
  }

  const ItemUser = [
    {
      key: '1',
      label: (
        <Link className='flex text-base gap-2 items-center' to={'/profile'}>
          <TbUserEdit className='w-6 h-6 object-cover hover:cursor-pointer' />
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link onClick={(e?: any) => handleLogOut(e)} className='flex text-base gap-2 items-center' to={'/login'}>
          <CiLogout className='w-6 h-6 object-cover hover:cursor-pointer' />
          <p>Log out</p>
        </Link>
      )
    },
  ];

  return (
    <div className='grid grid-cols-[auto_1fr] gap-4 min-h-screen bg-slate-100'>
      <div className='sticky top-0 w-[250px] flex flex-col gap-2 py-4 pe-3 bg-white shadow-md border-r-[1px] text-lg overflow-y-scroll h-screen'>
        <div className='px-2 py-1 flex justify-center items-center gap-2 text-3xl font-bold '>
          <img src={asset.admin} alt="" className='w-10 h-10' />
          <span className=''>ADMIN</span>
        </div>
        <span className='relative flex justify-center items-center text-gray-500 text-base mt-4 mb-3'>
          <hr className='w-full' />
          <span className='absolute bg-white px-2'>App & Page</span>
        </span>
        {navigationBars.map(item => (
          <button onClick={() => navigate(item.path)} className={`px-4 py-2 flex justify-start items-center gap-2 rounded-r-full hover:cursor-pointer hover:bg-slate-200 ${currentPath === item.path && 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}>
            <span className={`${currentPath === item.path && 'text-white'}`}>{item.icon}</span>
            <span className={`font-normal ${currentPath == item.path && 'font-semibold text-white'}`}>{item.title}</span>
          </button>
        ))}
      </div>
      <div className='grid-rows-[auto_1fr] space-y-5'>
        <div className=' pb-2 pt-3 px-3 flex items-center justify-end shadow-md bg-white rounded-s-lg'>
          <div className='flex items-center gap-2'>
            <div className='hover:bg-slate-200 group p-2 rounded-full'>
              <CiSearch className='w-8 h-8 object-cover hover:cursor-pointer group-hover:text-blue-400 rounded-full' />
            </div>
            <div className='hover:bg-slate-200 p-2 rounded-full group'>
              <IoMdNotificationsOutline className='w-8 h-8 object-cover hover:cursor-pointer group-hover:text-blue-400' />
              {/* <Dropdown
            menu={{
              items: ItemNofication,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <IoMdNotificationsOutline className='w-8 h-8 object-cover hover:cursor-pointer' />
              </Space>
            </a>
          </Dropdown> */}
            </div>
            <Dropdown
              menu={{
                items: ItemUser,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className='hover:bg-slate-200 p-2 rounded-full group'>
                  <FaRegCircleUser className='w-7 h-7 object-cover hover:cursor-pointer group-hover:text-blue-400' />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
