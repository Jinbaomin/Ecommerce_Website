import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {

  return (
    <div className=' flex flex-col min-h-screen'>
      <div className='flex-1'>
        <div className='px-[1vw] sm:px-[3vw] md:px-[5vw] lg:px-[7vw] border shadow-md'>
          <Header />
        </div>
        <div className='px-[1vw] sm:px-[3vw] md:px-[5vw] lg:px-[7vw]'>
          <Outlet />
        </div>
      </div>
      <div className='bg-slate-50 px-[2vw] sm:px-[4vw] md:px-[6vw] lg:px-[8vw] border'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
