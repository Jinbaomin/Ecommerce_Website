import React, { useEffect } from 'react'
import { FaRegUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { PiHouseLineBold } from "react-icons/pi";
import { asset } from '../../../assets/asset';
import Modal from '../../../ui/Modal';
import { useUser } from '../../../features/authentication/userUser';
import { IAccount, IBackendResponse, IUser } from '../../../types/backend';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUser } from '../../../features/user/useUpdateUser';

export interface IFormInput {
  fullName: string;
  email: string;
  phone: string;
}

const classNameForIcon = 'w-6 h-6 object-cover';

const info = [
  {
    icon: <FaRegUser className={classNameForIcon} />,
    title: 'Full Name',
    key: 'fullName'
  },
  {
    icon: <TfiEmail className={classNameForIcon} />,
    title: 'Email Address',
    key: 'email'
  },
  {
    icon: <FiPhone className={classNameForIcon} />,
    title: 'Phone',
    key: 'phone'
  }
]

const Profile_Info: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  // const [fullName, setFullName] = React.useState('John Smith');
  // const [email, setEmail] = React.useState('Johnsmith@gmai.com');
  // const [phone, setPhone] = React.useState('+8468372938');

  const switchModal = () => setShowModal(!showModal);
  const { data, isFetching } = useUser();
  const { updateUser, isPending, isSuccess } = useUpdateUser();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInput>({
    defaultValues: {
      fullName: data?.data.user.fullName,
      email: data?.data.user.email,
      phone: data?.data.user.phone
    }
  });


  useEffect(() => {
    if(isSuccess && !isFetching) {
      reset({
        fullName: data?.data.user.fullName,
        email: data?.data.user.email,
        phone: data?.data.user.phone
      });
      switchModal();
    }
  }, [isSuccess, isFetching])

  const handleSubmitForm: SubmitHandler<IFormInput> = ({ fullName, email, phone }, e) => {
    updateUser({ id: data?.data.user.userId, fullName, email, phone });
  }

  return (
    <div>
      <div className='mb-5'>
        <p className='font-medium text-xl mb-2'>Personal Information</p>
        <p className='font-light'>Manage your personal information</p>
      </div>

      <div>
        <div className='grid grid-cols-2 gap-4'>
          {info.map((item, index) => (
            <div key={index} className=''>
              <label className='text-base font-medium pl-2'>{item.title}</label>
              <div className='flex justify-between items-center px-2 py-[10px] bg-[#F9F9F9] rounded-xl border'>
                <div className='flex items-center gap-2 flex-1'>
                  {item.icon}
                  <input type='text' value={data?.data.user[item.key as keyof IFormInput]} className='bg-[#F9F9F9] flex-1 focus:outline-none text-base font-normal' readOnly />
                </div>
                <div>
                  <button onClick={switchModal} className='hover:cursor-pointer'>
                    <img src={asset.edit} className='w-6 h-6 object-cover outline-none focus:outline-none' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal onClose={switchModal}>
          <div className='py-4 px-2 min-w-[400px]'>
            <div className='text-center'>
              <p className='font-semibold text-2xl mb-4'>Change Personal Info</p>
            </div>
            <div className=''>
              <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-3'>
                <div>
                  <label className='pl-3 mb-1'>Full Name</label>
                  <div className='relative'>
                    <input {...register('fullName')} type='text' placeholder='Full Name' value={watch('fullName')} className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                    <FaRegUser className='absolute top-3 left-3' />
                  </div>
                </div>
                <div>
                  <label className='pl-3 mb-1'>Email</label>
                  <div className='relative'>
                    <input {...register('email')} type='text' placeholder='Email' value={watch('email')} className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                    <TfiEmail className='absolute top-3 left-3' />
                  </div>
                </div>
                <div>
                  <label className='pl-3 mb-1'>Phone</label>
                  <div className='relative'>
                    <input {...register('phone')} type='text' placeholder='Phone' value={watch('phone')} className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                    <FiPhone className='absolute top-3 left-3' />
                  </div>
                </div>
                <button className='mt-2 py-2 px-3 bg-blue-300 font-medium rounded-full text-sm focus:outline-none'>
                  Change and save
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Profile_Info;
