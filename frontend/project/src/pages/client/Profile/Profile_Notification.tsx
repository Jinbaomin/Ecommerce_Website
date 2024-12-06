import React from 'react'
import { TfiEmail } from "react-icons/tfi";
import { CiDeliveryTruck } from "react-icons/ci";
import Toggle from '../../../ui/Toggle';
import styled from 'styled-components';

const styledIcon = 'w-6 h-6 object-cover';

const content = [
  {
    id: 1,
    title: 'Email',
    description: 'We write emails to let you know what\'s important, like: new order, confirmations',
    icon: <TfiEmail className={styledIcon} />
  },
  {
    id: 2,
    title: 'Delivery',
    description: 'You will be noticed once the order is delivered',
    icon: <CiDeliveryTruck className={styledIcon} />
  },
]

const Profile_Notification: React.FC = () => {
  return (
    <div>
      <div className='mb-5 text-xl'>
        <p className='font-medium mb-2'>Notification</p>
        <p className='font-light text-base'>Manage your notification settings</p>
      </div>

      <div className='grid grid-cols-2'>
        {content.map((item, index) => (
          <div className='w-[300px] flex justify-between'>
            <div className='w-2/3'>
              <div className='flex gap-2 items-center mb-2'>
                {item.icon}
                <p className='text-lg font-medium' >{item.title}</p>
              </div>
              <p className='text-sm font-light'>{item.description}</p>
            </div>
            <div className='flex justify-end flex-1 pt-1'>
              <Toggle order={index} />
            </div>
          </div>
        ))}

        {/* <div className='w-[300px] flex justify-between'>
          <div className='w-2/3'>
            <div className='flex gap-2 items-center mb-2'>
              <LuMails className='w-6 h-6 object-cover' />
              <p className='text-sm' >Email</p>
            </div>
            <p className='text-xs font-extralight'>We write emails to let you know what's important, like: new order, confirmations </p>
          </div>
          <div className='flex justify-end flex-1 pt-1'>
            <Toggle key={1} />
          </div>
        </div>

        <div className='w-[300px] flex justify-between'>
          <div className='w-2/3'>
            <div className='flex gap-2 items-center mb-2'>
              <CiDeliveryTruck className='w-6 h-6 object-cover' />
              <p className='text-sm' >Email</p>
            </div>
            <p className='text-xs font-extralight'>You will be noticed once the order is delivered</p>
          </div>
          <div className='flex justify-end flex-1 pt-1'>
            <Toggle key={2} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Profile_Notification;
