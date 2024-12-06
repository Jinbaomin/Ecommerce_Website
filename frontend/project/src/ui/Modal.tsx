import React, { useEffect, useRef } from 'react'
import { IoClose } from "react-icons/io5";

interface ModalProps {
  children: React.ReactNode,
  onClose: () => void
}

const Modal: React.FC<ModalProps> = (props) => {

  const modalRef = useRef();

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    window.addEventListener('keydown', closeModal);
    return () => removeEventListener('keydown', closeModal);
  }, []);

  return (
    <div onClick={props.onClose} className='w-[100%] h-screen fixed top-0 left-0 z-[100] bg-black/10 backdrop-blur-sm px-3 py-4'>
      <div onClick={(e) => e.stopPropagation()} className='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#f3f4f6] p-4 transition-all duration-500 shadow-lg rounded-lg'>
        <div>
          <IoClose onClick={props.onClose} className='absolute w-8 h-8 top-3 right-3 hover:cursor-pointer hover:bg-slate-100 rounded-full' />
        </div>
        <div className='text-base'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal;



