import React from 'react'
import { asset } from '../../assets/asset'

const content = [
  {
    title: 'About us',
    details: ['Introduce', 'Hiring']
  },
  {
    title: 'Policy',
    details: ['Returning Policy', 'Privacy Policy', 'Terms of Service', 'Payment Policy']
  },
  {
    title: 'Information',
    details: ['Store system', 'Purchasing Instruction', 'Looking up warrant address']
  }
]

const deliveries = [
  asset.ship1,
  asset.ship2,
  asset.ship3,
  asset.ship4
]

const payments = [
  asset.pay1,
  asset.pay2,
  asset.pay3,
  asset.pay4,
  asset.pay5,
  asset.pay6,
  asset.pay7,
  asset.pay8
]

const socials = [
  {
    link: 'https://www.facebook.com/',
    icon: asset.facebook
  },
  {
    link: 'https://www.tiktok.com/',
    icon: asset.tiktok
  },
  {
    link: 'https://www.youtube.com/',
    icon: asset.youtube
  },
  {
    link: 'https://zalo.me/',
    icon: asset.zalo
  }
]

const Footer: React.FC = () => {
  return (
    <div>
      <div className='flex flex-wrap sm:flex-row justify-between items-start py-4 border-b border-slate-400'>
        {content.map((item, index) => (
          <div key={index}>
            <h3 className='font-medium mb-3 text-base'>{item.title}</h3>
            <div className='space-y-2'>
              {item.details.map((detail, index) => (
                <p className='text-base hover:cursor-pointer hover:underline hover:underline-offset-2' key={index}>{detail}</p>
              ))}
            </div>
          </div>
        ))}
        <div>
          <h3 className='font-medium mb-3 text-base'>Support (8:00AM-21:00PM)</h3>
          <div className='space-y-2'>
            <p className='text-base'>Purchasing: <a className='text-blue-500 font-medium' href='tel:19005301'>1900.5301</a></p>
            <p className='text-base'>Warranty: <a className='text-blue-500 font-medium' href='tel:19005325'>1900.5325</a></p>
            <p className='text-base'>Complainting: <a className='text-blue-500 font-medium' href='tel:18004037'>1800.4037</a></p>
            <p className='text-base'>Email: <a className='text-blue-500 font-medium' href='mailto:supportservice@gmail.com'>supportservice@gmail.com</a></p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            <h3 className='font-medium mb-3 text-base'>Delivery Agency</h3>
            <div className='flex justify-center items-center'>
              {deliveries.map((delivery, index) => (
                <img src={delivery} key={index} className='w-20 h-16 object-contain' />
              ))}
            </div>
          </div>
          <div>
            <h3 className='font-semibold mb-3 text-base'>Payment Method</h3>
            <div className='grid grid-cols-4 gap-1'>
              {payments.map((payment, index) => (
                <img src={payment} key={index} className='w-16 h-12 object-contain' />
              ))}
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='py-4 flex items-center justify-between'>
        <p className='text-base text-center font-medium'>© Copyright by Jinbaomin </p>
        <div className='flex gap-2 justify-center items-center'>
          <p className='text-base font-medium'>Connect with us</p>
          <div className='flex gap-2'>
            {socials.map((social, index) => (
              <a target='_blank' href={social.link} className='hover:cursor-pointer'>
                <img src={social.icon} key={index} className='w-8 h-8 object-cover' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
