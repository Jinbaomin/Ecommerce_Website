import React from 'react'
import { useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Spinner from '../../../ui/Spinner';
import { asset } from '../../../assets/asset';


const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleAddProduct = (data: any) => {
    console.log('Submit');
  }

  return (
    <div className='py-4'>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-lg hover:bg-violet-200 mb-3'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      <form onSubmit={handleSubmit(handleAddProduct)} className='grid grid-cols-[6fr_3fr] items-start gap-4 p-4'>
        <div className='flex flex-col gap-4'>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Product Information</p>
            <div className='grid grid-cols-[1fr_1fr] gap-x-3'>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Product name
                  </label>
                  <input type='text' placeholder='Product name' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Quantity
                  </label>
                  <input type='number' placeholder='Quantity' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='col-span-2'>
                <label className='text-base font-medium pl-3 mb-2'>
                  Description
                </label>
                <textarea placeholder='Description' className='focus:outline-none focus:ring-2 h-[200px] border rounded-lg w-full p-2 '>
                </textarea>
              </div>
            </div>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Image</p>
            <input
              type='file'
              id='fileInput'
              className='hidden'
              accept='image/*'
            />
            <label htmlFor="fileInput" className='relative'>
              <span className='w-24 h-24 border bg-slate-100 cursor-pointer flex justify-center items-center border-gray-600 rounded-md'>
                {/* <AddPhotoAlternateIcon className='text-white' /> */}
                <img src={asset.addPhoto} alt="" className='w-10 h-10 text-white' />
              </span>
              {
                uploading && (
                  <span className='w-24 h-24 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                    <Spinner size={60} />
                  </span>
                )
              }
            </label>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Additional Information</p>
            <div className=''>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Brand
                  </label>
                  <input type='text' placeholder='Brand' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    CPU
                  </label>
                  <input type='text' placeholder='CPU' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Screen size
                  </label>
                  <input type='text' placeholder='Screen size' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                  <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                    <label className='text-base font-medium pl-3'>
                      Ram
                    </label>
                    <input type='text' placeholder='Ram' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                    {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                  </div>
                </div>
                <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                  <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                    <label className='text-base font-medium pl-3'>
                      Rom
                    </label>
                    <input type='text' placeholder='Rom' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                    {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Baterry life
                  </label>
                  <input type='text' placeholder='Baterry life' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <div>
              <p className='text-xl font-medium mb-4'>Pricing</p>
              <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Price
                </label>
                <input type='number' placeholder='Base price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
              </div>
              <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Discount price
                </label>
                <input type='number' placeholder='Discount price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
              </div>
            </div>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <div>
              <p className='text-xl font-medium mb-4'>Category</p>
              <select className='px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 w-full'>
                <option value='' className='hover:bg-slate-100'>Select category</option>
                <option value='' className='hover:bg-slate-100'>Laptop</option>
                <option value='' className='hover:bg-slate-100'>Phone</option>
              </select>

              {/* <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Price
                </label>
                <input type='number' placeholder='Base price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>}
              </div>
              <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Discount price
                </label>
                <input type='number' placeholder='Discount price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>}
              </div> */}
            </div>
          </div>
        </div>
        <button className='w-fit px-3 py-2 bg-blue-500 hover:bg-blue-600 text-lg text-white font-medium rounded-xl '>Submit</button>
      </form>
    </div>
  )
}

export default AddProduct;
