import React from 'react'

interface IFullPageProsp {
  children: React.ReactNode;
}

const FullPage: React.FC<IFullPageProsp> = (props) => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-50'>
      {props.children}
    </div>
  )
}

export default FullPage
