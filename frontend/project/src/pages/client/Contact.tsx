import React from 'react'
import { CiMail } from "react-icons/ci";
import { MdOutlineHeadphones } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const contact = [
  {
    icon: <CiMail className='w-10 h-10 object-cover' />,
    title: 'Email',
    content: 'info@technician.com'
  },
  {
    icon: <MdOutlineHeadphones className='w-10 h-10 object-cover'/>,
    title: 'Phone',
    content: '+8472837927'
  },
  {
    icon: <CiLocationOn className='w-10 h-10 object-cover' />,
    title: 'Location',
    content: '100 Hoang Kiem, Ha Noi'
  }
]

const Contact: React.FC = () => {
  return (
    <div className='flex flex-col gap-2 py-10'>
      <div className='flex flex-col sm:flex-row gap-4 justify-evenly items-center '>
        {contact.map((item,index) => (
          <div key={index} className='flex flex-col items-center rounded-lg px-4 py-3'>
            {item.icon}
            <p className='text-lg font-medium'>{item.title}</p>
            <span className='text-base text-gray-500'>{item.content}</span>
          </div>
        ))}
      </div>
      <div className='px-[100px] py-[50px] flex flex-col'>
        <div className='text-center mb-4'>
          <p className='text-4xl font-bold'>Contact Us</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <input required className='focus:ring-2 focus:outline-none px-3 py-3 bg-slate-100 rounded-2xl text-sm' type='text' placeholder='Your Name' />
          <input required className='focus:ring-2 focus:outline-none px-3 py-3 bg-slate-100 rounded-2xl text-sm' type='text' placeholder='Your Email' />
          <input required className='focus:ring-2 focus:outline-none px-3 py-3 bg-slate-100 rounded-2xl text-sm' type='text' placeholder='Your Phone' />
          <textarea required className='focus:ring-2 focus:outline-none px-3 py-3 bg-slate-100 rounded-2xl text-sm col-span-1 sm:col-span-3 h-80' placeholder='Message...'></textarea>
        </div>
        <div className='mt-4 flex justify-center sm:justify-end'>
          <button className='bg-blue-500 py-2 px-3 rounded-full text-white hover:cursor-poiter focus:ring-2'>Send Message</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
