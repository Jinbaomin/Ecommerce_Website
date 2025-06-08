import React from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Spinner from '../../../ui/Spinner';
import { GoTrash } from "react-icons/go";
import { asset } from '../../../assets/asset';
import { uploadImageToCloudinary } from '../../../helper/uploadImageToCloudinary';
import { useCreateProduct } from '../../../features/product/useCreateProduct';
import { Select, Space } from 'antd';
import { useGetAllCategory } from '../../../features/category/useGetAllCategory';
import FullPage from '../../../ui/FullPage';

export interface FormValuesProduct {
  productName: string;
  price: number;
  salePrice: number;
  description: string;
  quantity: number;
  categoryId: number;
  images: string[];
  brand: string;
  cpu: string;
  screenSize: string;
  ram: string;
  rom: string;
  batteryLife: string;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { data: category, isPending: isPendingCategory } = useGetAllCategory();
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { createNewProduct, isPending } = useCreateProduct();

  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm<FormValuesProduct>({
    defaultValues: {
      productName: '',
      price: NaN,
      salePrice: NaN,
      description: '',
      quantity: NaN,
      categoryId: 1,
      images: [],
      brand: '',
      cpu: '',
      screenSize: '',
      ram: '',
      rom: '',
      batteryLife: '',
    }
  });

  const handleAddProduct: SubmitHandler<FormValuesProduct> = (data) => {
    createNewProduct(data);
  }

  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);
    const image = await uploadImageToCloudinary(file);
    setValue('images', [...getValues().images, image]);
    setUploading(false);
  }

  const handleRemoveImage = (index: number) => {
    setDeleting(true);
    const images = getValues().images;
    images.splice(index, 1);
    setDeleting(false);
    reset({ images });
  }

  if (isPendingCategory) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  return (
    <div className='py-4'>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-xl hover:bg-sky-200 mb-3'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      <h1 className='text-4xl font-semibold text-center text-blue-500 mb-4'>Add a new product</h1>
      <form onSubmit={handleSubmit(handleAddProduct)} className='grid grid-cols-[6fr_3fr] items-start gap-4 pr-4'>
        <div className='flex flex-col gap-4'>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Product Information</p>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Product name
                  </label>
                  <input {...register('productName')} type='text' placeholder='Product name' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Quantity
                  </label>
                  <input {...register('quantity')} type='number' placeholder='Quantity' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='col-span-2'>
                <label className='text-base font-medium pl-3 mb-2'>
                  Description
                </label>
                <textarea  {...register('description')} placeholder='Description' className='focus:outline-none focus:ring-2 h-[200px] border rounded-lg w-full p-2 '>
                </textarea>
              </div>
            </div>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Image</p>
            <div className='flex flex-wrap gap-3'>
              <input
                type='file'
                id='fileInput'
                className='hidden'
                accept='image/*'
                onChange={(e) => handleUploadImage(e)}
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
              <div className='flex flex-wrap gap-2'>
                {
                  getValues().images.map((image, index) => (
                    <div className='relative hover:cursor-pointer'>
                      <img src={image} alt="" className='w-24 h-24 object-cover rounded-md' />
                      <span className='w-24 h-24 absolute top-0 left-0 flex justify-center items-center'>
                        <GoTrash className='h-8 w-8 text-red-500' onClick={() => handleRemoveImage(index)} />
                        {deleting && <Spinner size={60} />}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Additional Information</p>
            <div className=''>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Brand
                  </label>
                  <input  {...register('brand')} type='text' placeholder='Brand' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    CPU
                  </label>
                  <input  {...register('cpu')} type='text' placeholder='CPU' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Screen size
                  </label>
                  <input  {...register('screenSize')} type='text' placeholder='Screen size' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                  {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                  <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                    <label className='text-base font-medium pl-3'>
                      Ram
                    </label>
                    <input  {...register('ram')} type='text' placeholder='Ram' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                    {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                  </div>
                </div>
                <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                  <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                    <label className='text-base font-medium pl-3'>
                      Rom
                    </label>
                    <input  {...register('rom')} type='text' placeholder='Rom' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                    {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between lg:flex-row gap-2 w-full'>
                <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                  <label className='text-base font-medium pl-3'>
                    Baterry life
                  </label>
                  <input  {...register('batteryLife')} type='text' placeholder='Baterry life' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
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
                <input  {...register('price')} type='number' placeholder='Base price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
              </div>
              <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Discount price
                </label>
                <input  {...register('salePrice')} type='number' placeholder='Discount price' className='focus:outline-none rounded-xl  px-3 py-2 border w-full text-base focus:ring-2' />
                {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
              </div>
            </div>
          </div>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <div>
              <p className='text-xl font-medium mb-4'>Category</p>
              <Space wrap>
                <Select
                  defaultValue="Laptop"
                  // className='w-full'
                  style={{ width: 370 }}
                  // onChange={handleChange}
                  options={category?.data.map(item => ({ value: item.categoryId, label: item.categoryName })) || []}
                // options={[
                //   { value: 1, label: 'Laptop' },
                //   { value: 2, label: 'Phone' },
                //   { value: 'Yiminghe', label: 'yiminghe' },
                //   { value: 'disabled', label: 'Disabled', disabled: true },
                // ]}
                />
              </Space>
              {/* <select {...register('categoryId')} className='px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 w-full'>
                <option value='' className='hover:bg-slate-100'>Select category</option>
                <option value={1} className='hover:bg-slate-100'>Laptop</option>
                <option value={2} className='hover:bg-slate-100'>Phone</option>
              </select> */}
            </div>
          </div>
        </div>
        <button className='flex gap-2 w-fit px-3 py-2 bg-blue-500 hover:bg-blue-600 text-lg text-white font-medium rounded-xl '>
          {isPending ? (
            <>
              <Spinner size={20} />
              <span className='ml-2'>Adding...</span>
            </>
          ) : 'Add product'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct;
