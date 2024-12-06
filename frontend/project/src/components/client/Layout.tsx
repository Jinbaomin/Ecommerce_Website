import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = () => {

  return (
    <div className=' flex flex-col min-h-screen'>
      <div className='px-[2vw] sm:px-[4vw] md:px-[6vw] lg:px-[8vw] flex-1'>
        <Header />
        <Outlet />
      </div>
      <div className='bg-slate-50 px-[2vw] sm:px-[4vw] md:px-[6vw] lg:px-[8vw]'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
