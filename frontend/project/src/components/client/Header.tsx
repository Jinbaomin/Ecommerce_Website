import React from 'react'
import { CiUser } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { asset } from '../../assets/asset';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { Dropdown, Space } from 'antd';
import { TbUserEdit } from 'react-icons/tb';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useLogout } from '../../features/authentication/useLogout';
import { log } from 'console';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useUser } from '../../features/authentication/userUser';
import { useMyCart } from '../../features/cart/useMyCart';
import { FaRegCircleUser } from "react-icons/fa6";
import FullPage from '../../ui/FullPage';
import Spinner from '../../ui/Spinner';

const ItemNofication = [
  {
    key: '1',
    label: (
      <p>Content 1</p>
    )
  },
  {
    key: '2',
    label: (
      <p>Content 2</p>
    )
  },
  {
    key: '3',
    label: (
      <p>Content 3</p>
    )
  }
]

const navigation = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: "Product",
    path: '/products'
  },
  {
    title: 'Contact',
    path: '/contact'
  },
  {
    title: 'Blog',
    path: '/blog'
  }
]

const Header: React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState(true);
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const { data, isFetching: isFetchingUser } = useUser();
  const { logout, isPending } = useLogout();
  const { data: dataCart, isPending: pendingCart, isFetching } = useMyCart();

  if (pendingCart) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  // console.log(localStorage.getItem('access_token'), dataCart);

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
    <div className=' pb-2 pt-3 px-3 flex items-center justify-between'>
      <div className='w-20 flex items-center gap-3 hover:cursor-pointer' onClick={() => navigate('/')}>
        <img src={asset.logo} className='h-12 w-12 object-cover' />
        <h1 className='font-extrabold text-4xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text'>TECH4</h1>
        {/* <h1 className='font-extrabold text-4xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>TECH4</h1> */}
      </div>
      <div className='flex gap-7'>
        {navigation.map((item, index) => (
          <Link to={item.path} key={index} className='hover:cursor-pointer relative overflow-hidden group'>
            <p className={`text-lg group-hover:-translate-y-1 group-hover:font-semibold group-hover:text-blue-500 transition-all group-hover:text-xl ${pathname === item.path && 'text-blue-500 font-semibold'}`}>{item.title}</p>
            <span className='h-[1px] rounded-lg w-100% block bg-slate-500 translate-y-2 group-hover:-translate-y-1 transition-all'></span>
          </Link>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <div className='hover:bg-slate-200 group p-2 rounded-full'>
          <CiSearch className='w-8 h-8 object-cover hover:cursor-pointer group-hover:text-blue-400 rounded-full' />
        </div>
        <div onClick={() => navigate('/cart')} className='relative hover:bg-slate-200 p-2 rounded-full group'>
          <BsCart2 className='w-7 h-7 object-cover hover:cursor-pointer group-hover:text-blue-400' />
          <span className={`absolute top-1 right-1 bg-red-500 text-white text-xs px-[7px] py-[1px] flex justify-center items-end rounded-full ${(pendingCart || dataCart?.data?.cartItems.length === 0) && 'hidden'}`}>
            {dataCart?.data.cartItems.length}
          </span>
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
        {
          data?.data?.user.roles[0] === 'ADMIN' && (
            <Link to={'/admin'} className='hover:bg-slate-200 p-2 rounded-full group'>
              <MdOutlineAdminPanelSettings className='w-8 h-8 object-cover hover:cursor-pointer group-hover:text-blue-400' />
            </Link>
          )
        }
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
  )
}

export default Header;
