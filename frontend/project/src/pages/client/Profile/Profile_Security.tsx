import React, { useEffect } from 'react'
import { IoKeyOutline } from "react-icons/io5";
import Modal from '../../../ui/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChangePassword } from '../../../features/user/useChangePassword';
import Spinner from '../../../ui/Spinner';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';

interface IChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePassword extends Omit<IChangePasswordInput, 'confirmPassword'> { };


const Profile_Security: React.FC = () => {
  const [isShowModal, setIsShowModal] = React.useState(false);
  const handleShowModal = () => setIsShowModal(!isShowModal);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handlShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const { changePassword, isPending, isSuccess } = useChangePassword();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IChangePasswordInput>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      handleShowModal();
    }
  }, [isPending, isSuccess]);

  const handleSubmitInput: SubmitHandler<IChangePasswordInput> = ({ oldPassword, newPassword }) => {
    changePassword({ oldPassword, newPassword });
  }

  return (
    <div>
      <div className='mb-4'>
        <p className='font-medium text-xl mb-2'>Security setting</p>
        <p className='font-light'>Change your password and phone number</p>
      </div>

      <button onClick={handleShowModal} className='py-2 px-3 bg-blue-300 font-medium rounded-full focus:outline-none'>
        Change Password
      </button>

      {isShowModal && (
        <Modal onClose={handleShowModal}>
          <form onSubmit={handleSubmit(handleSubmitInput)} className='py-4 px-2 min-w-[400px]'>
            <div className='text-center'>
              <p className='font-semibold text-3xl mb-4'>Change Password</p>
            </div>
            <div>
              <div className='flex flex-col gap-3'>
                <div>
                  <label className='pl-3 text-base mb-1'>Current Password</label>
                  <div className='relative'>
                    <input {...register('oldPassword')} type={showPassword ? 'text' : 'password'} placeholder='Current password' className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                    <IoKeyOutline className='absolute top-3 left-3' />
                    {
                      showPassword ? (
                        <FaEyeSlash onClick={handleShowPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      ) : (
                        <FaRegEye onClick={handleShowPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      )
                    }
                  </div>
                </div>

                <div>
                  <label className='pl-3 text-base mb-1'>New Password</label>
                  <div className='relative'>
                    <input {...register('newPassword', {
                      required: 'This field is required',
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message: 'At least 8 characters, one letter, one number and one special character'
                      }
                    })} type={showNewPassword ? 'text' : 'password'} placeholder='New password' className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 pl-9 border pe-3 py-3 w-full' />
                    <IoKeyOutline className='absolute top-3 left-3' />
                    {
                      showNewPassword ? (
                        <FaEyeSlash onClick={handlShowNewPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      ) : (
                        <FaRegEye onClick={handlShowNewPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      )
                    }
                    {errors?.newPassword && <p className='text-sm text-red-500 pl-3'>{errors.newPassword.message}</p>}
                  </div>
                </div>

                <div>
                  <label className='pl-3 text-base mb-1'>Password Confirm</label>
                  <div className='relative'>
                    <input {...register('confirmPassword', {
                      required: 'This field is required',
                      validate: (value) => value === watch('newPassword') || 'The password confirm do not match'
                    })} type={showConfirmPassword ? 'text' : 'password'} placeholder='Password Confirm' className='h-10 bg-[#F6F6F6] rounded-lg focus:outline-none focus:ring-2 border pl-9 pe-3 py-3 w-full' />
                    <IoKeyOutline className='absolute top-3 left-3' />
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash onClick={handleShowConfirmPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      ) : (
                        <FaRegEye onClick={handleShowConfirmPassword} className='absolute right-3 top-3 hover:cursor-pointer' />
                      )
                    }
                    {errors?.confirmPassword && <p className='text-sm text-red-500 pl-3'>{errors.confirmPassword.message}</p>}
                  </div>
                </div>
                <button className='flex justify-center items-center mt-2 py-2 px-3 bg-blue-300 font-medium rounded-full focus:outline-none'>
                  {isPending ? (
                    <>
                      <Spinner size={15} />
                      <p>Loading...</p>
                    </>
                  ) : (
                    <p>Change</p>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div >
  )
}

export default Profile_Security;
