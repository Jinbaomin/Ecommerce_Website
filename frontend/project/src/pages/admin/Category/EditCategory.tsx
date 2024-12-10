import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router'
import Spinner from '../../../ui/Spinner';
import { useCreateCategory } from '../../../features/category/useCreateCategory';
import { useGetCategoryById } from '../../../features/category/useGetCategoryById';
import FullPage from '../../../ui/FullPage';
import { useUpdateCategory } from '../../../features/category/useUpdateCategory';

interface FormValuesCategory {
  categoryName: string;
}

const EditCateogory: React.FC = () => {
  const navigate = useNavigate();
  const { data: category, isPending } = useGetCategoryById();
  const { updateCategory, isPending: isPendingUpdate, isSuccess } = useUpdateCategory();
  const { register, handleSubmit, formState: { errors }, setValue, getValues, reset, watch } = useForm<FormValuesCategory>({
    defaultValues: {
      categoryName: category?.data.categoryName
    }
  });

  // useEffect(() => {
  //   if (isSuccess && !isPendingUpdate) {
  //     reset({
  //       categoryName: category?.data.categoryName
  //     });
  //   }
  // }, [isPending, isSuccess])

  useEffect(() => {
    reset({
      categoryName: category?.data.categoryName
    });
  }, [category?.data])

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const handleAddCategory: SubmitHandler<FormValuesCategory> = (data) => {
    // console.log(data);
    updateCategory({ categoryId: category?.data.categoryId.toString(), categoryName: data.categoryName });
  }

  return (
    <div className='py-4'>
      <button onClick={() => navigate(-1)} className='p-1 border-2 rounded-xl hover:bg-sky-200 mb-3'>
        <IoArrowBack className='w-7 h-7' />
      </button>
      <h1 className='text-4xl font-semibold text-center text-blue-500 mb-4'>Edit Category</h1>
      <form onSubmit={handleSubmit(handleAddCategory)} className='w-[60%] mx-auto'>
        <div className='flex flex-col gap-4'>
          <div className='bg-white p-4 shadow-md border rounded-xl'>
            <p className='text-xl font-medium mb-4'>Category Information</p>
            <div className='flex flex-col justify-between lg:flex-row gap-2'>
              <div className='flex flex-col mb-3 space-y-2 w-[100%]'>
                <label className='text-base font-medium pl-3'>
                  Category name
                </label>
                <input {...register('categoryName')} type='text' placeholder='Category name' className='focus:outline-none rounded-xl px-3 py-2 border w-full text-base focus:ring-2' />
                {/* {errors?.fullName && <p className='text-base text-red-500 pl-3'>{errors.fullName.message}</p>} */}
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='flex gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-lg text-white font-medium rounded-xl '>
                {isPendingUpdate ? (
                  <>
                    <Spinner size={20} />
                    <span className='ml-2'>Saving...</span>
                  </>
                ) : 'Save Category'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditCateogory;
