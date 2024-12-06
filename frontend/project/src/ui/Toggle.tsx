import React from 'react'

interface ToggleProps {
  order?: number
}

const Toggle: React.FC<ToggleProps> = (props) => {
  return (
    // <div className='w-[100%] h-screen flex justify-center items-center'>
    <>
      <input className='peer hidden' id={`toggle${props.order}`} type='checkbox' />
      <label htmlFor={`toggle${props.order}`} className='w-[50px] h-[25px] relative bg-slate-200 rounded-full before:content-[""] before:absolute before:top-[4px] before:left-[6px] before:w-[17px] before:h-[17px] before:rounded-full before:bg-white peer-checked:bg-blue-600 peer-checked:before:translate-x-[22px] transition-all duration-500'></label>
    </>
    // </div>
  )
}

export default Toggle;
