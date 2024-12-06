import React from 'react'
import { asset } from '../../../assets/asset'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import { useProducts } from '../../../features/product/useProducts';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { convertCurrency } from '../../../helper/helper';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useUser } from '../../../features/authentication/userUser';
import { useAddProductToCart } from '../../../features/cart/useAddProductToCart';
import { useAddProductToWishList } from '../../../features/wishlist/useAddProductToWishList';
import { useDeleteProductFromWishList } from '../../../features/wishlist/useDeleteProductFromWishList';
import { Pagination } from 'antd';

const categories = [
  {
    icon: asset.mobile,
    title: 'Mobile',
    param: 'mobile'
  },
  {
    icon: asset.computer,
    title: 'Computer',
    param: 'computer'
  },
  {
    icon: asset.tablet,
    title: 'Tablet',
    param: 'tablet'
  },
  {
    icon: asset.game,
    title: 'Gaming',
    param: 'gaming'
  },
  {
    icon: asset.monitor,
    title: 'Monitor',
    param: 'monitor'
  },
  // {
  //   icon: asset.devices,
  //   title: 'Accessories',
  //   param: 'accesories'
  // }
];

const products = [
  {
    id: 1,
    image: 'https://product.hstatic.net/200000722513/product/ook_air_m2_8gpu_16gb_256gb_-_midnight_8ead913e1d624d79be608bbbc7f46f94_f825a6934627488b965e487885ce51dd_grande.jpg',
    name: 'MacBook Air M3 13 inch 2024 8GB - 256GB',
    newPrice: '20.000.000',
    oldPirce: '15.000.000'
  },
  {
    id: 2,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_2__5.png',
    name: 'Apple MacBook Air M2 2024 8CPU 10GPU 16GB 512GB',
    newPrice: '25.000.000',
    oldPirce: '22.000.000'
  },
  {
    id: 3,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_560_10_.png',
    name: 'Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
  {
    id: 4,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_560_10_.png',
    name: 'Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
  {
    id: 5,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_4__1.png',
    name: 'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
  {
    id: 6,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_15__7_59.png',
    name: 'Laptop ASUS Vivobook 14 OLED A1405ZA-KM263W',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
  {
    id: 4,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_560_10_.png',
    name: 'Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
  {
    id: 4,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_560_10_.png',
    name: 'Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A',
    newPrice: '21.000.000',
    oldPirce: '19.000.000'
  },
]

const Product: React.FC = () => {
  const navigate = useNavigate();
  const handleSearchByParam = (param: string) => {
    navigate(`/product?category=${param}`);
  }

  const { data, isPending } = useProducts();
  const { data: dataUser, isFetching } = useUser();
  const { addProductToWishList } = useAddProductToWishList();
  const { deleteProductFromWishList } = useDeleteProductFromWishList();

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const handlAddProductToWishList = (e: any, productId: string) => {
    e.stopPropagation();
    addProductToWishList({ productId });
  }

  const hanldeDeleteProductFromWishList = (e: any, productId: string) => {
    e.stopPropagation();
    deleteProductFromWishList({ productId });
  }

  const wishList = dataUser?.data.user.wishList.map(item => item.productId);

  return (
    <div className='py-10'>
      <div className='flex flex-row gap-2 justify-evenly items-center'>
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleSearchByParam(category.param)} className='flex flex-col gap-1 items-center p-4 border rounded-lg hover:cursor-pointer shadow-md hover:bg-blue-200'>
            <img src={category.icon} alt={category.title} className='w-10 h-10 object-cover' />
            <p className='text-base'>{category.title}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-row items-start px-8 gap-4 py-5'>
        <div className='sticky top-3 w-[17%] border p-4 rounded-lg '>
          <p className='font-medium text-xl'>Filter</p>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>Brand</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'asus'} />
                <label className='text-base'>Asus</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'apple'} />
                <label className='text-base'>Apple</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'msi'} />
                <label className='text-base'>MSI</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'dell'} />
                <label className='text-base'>Dell</label>
              </div>
            </div>
          </div>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>RAM</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'32'} />
                <label className='text-base'>32GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'16'} />
                <label className='text-base'>16GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'8'} />
                <label className='text-base'>8GB</label>
              </div>
            </div>
          </div>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>Drive Size</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'512'} />
                <label className='text-base'>512GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'256'} />
                <label className='text-base'>256GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'128'} />
                <label className='text-base'>128GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'64'} />
                <label className=''>64GB</label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 grid grid-cols-4 gap-3'>
          {data?.data.map((product) => (
            <div onClick={() => navigate(`/products/${product.productId}`)} key={product.productId} className='px-4 py-2 rounded-lg border hover:shadow-lg flex flex-col items-center min-h-[270px] hover:cursor-pointer'>
              <img src={product.images[0]} className='w-32 my-2' />
              <span className='border border-black w-full'></span>
              <p className='text-sm font-medium mt-3 line-clamp-3 h-1/4'>{product.productName}</p>
              <div className='flex justify-between w-full mt-3'>
                <div className='flex flex-col'>
                  <p className='text-gray-500 font-medium line-through text-sm'>{convertCurrency(product.price)} VND</p>
                  <p className='text-red-500 font-medium text-base flex items-center gap-2'>
                    {convertCurrency(product.salePrice)} VND
                    <span className='text-xs p-[2px] border-1 border-red-500 bg-red-200 outline-none'>-{Math.ceil(product.price / product.salePrice)}%</span>
                  </p>
                </div>
                {/* <button className='bg-blue-500 hover:bg-blue-600 px-3 py-2 text-xs text-white rounded-lg'>
                  Add to cart
                </button> */}
              </div>
              <div className='flex justify-between items-center mt-2 w-full'>
                Rating
                <div className='flex items-center gap-1'>
                  <span className='text-sm text-gray-500'>Yeu Thich</span>
                  {wishList?.includes(product.productId) ? (
                    <FaHeart onClick={(e) => hanldeDeleteProductFromWishList(e, product.productId)} className='w-5 h-5 object-cover text-red-500' />
                  ) : (
                    <FaRegHeart onClick={(e) => handlAddProductToWishList(e, product.productId)} className='w-5 h-5 object-cover hover:text-red-500' />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination align="end" defaultCurrent={1} total={100} />
    </div>
  )
}

export default Product
