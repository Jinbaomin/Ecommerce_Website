import React from 'react'
import Slider from "react-slick";
import { Carousel } from 'antd';
import { carousel, discountBanner } from '../../assets/asset';
import { ArrowBigUpIcon } from 'lucide-react';
import { convertCurrency } from '../../helper/helper';
import { useNavigate } from 'react-router';
import { CiDeliveryTruck } from "react-icons/ci";
import { useProducts } from '../../features/product/useProducts';
import FullPage from '../../ui/FullPage';
import Spinner from '../../ui/Spinner';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '400px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
};

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 4000,
  cssEase: "linear"
};

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, isPending } = useProducts();

  if (isPending) return (
    <FullPage>
      <Spinner size={50} />
    </FullPage>
  )

  const macbook = data?.data.data.filter(product => product.productInfo.brand === 'Apple');
  const asus = data?.data.data.filter(product => product.productInfo.brand === 'Asus');

  return (
    <div className='py-4'>
      {/* <h1 className='font-extrabold text-6xl text-center mb-3'>TRANG CHU</h1> */}
      <>
        <Carousel className='w-[85%] mx-auto mt-3' arrows infinite={true}>
          <img src={carousel.image4} className='' alt="" />
          <img src={carousel.image3} className='' alt="" />
          <img src={carousel.image5} className='' alt="" />
          <img src={carousel.image2} className='' alt="" />
        </Carousel>
      </>
      <div className="slider-container w-[80%] mx-auto border rounded-lg px-4 pb-8 my-4">
        <div className='my-3 flex gap-2 items-center'>
          <p className='text-3xl font-medium'>Bestsellers</p>
          <span className='h-[30px] border bg-slate-400 mx-3'></span>
          <CiDeliveryTruck className='w-10 h-10 text-red-500' />
          <p className='text-lg font-medium'>Free Delivery</p>
        </div>
        <Slider {...settings}>
          {data?.data.data.map((product) => (
            <div onClick={() => navigate(`/products/${product.productId}`)} key={product.productId} className='px-4 py-2 rounded-lg border hover:shadow-lg flex flex-col items-center h-[350px] hover:cursor-pointer'>
              <img src={product.images[0]} className='w-32 my-2 h-32 object-cover mx-auto' />
              <div className='border border-black w-full'></div>
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
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider-container w-[80%] mx-auto border rounded-lg px-4 pb-8 my-4">
        <div className='my-3 flex gap-2 items-center'>
          <p className='text-3xl font-medium'>Macbook</p>
          <span className='h-[30px] border bg-slate-400 mx-3'></span>
          <CiDeliveryTruck className='w-10 h-10 text-red-500' />
          <p className='text-lg font-medium'>Free Delivery</p>
        </div>
        <Slider {...settings}>
          {macbook?.map((product) => (
            <div onClick={() => navigate(`/products/${product.productId}`)} key={product.productId} className='px-4 py-2 rounded-lg border hover:shadow-lg flex flex-col items-center h-[350px] hover:cursor-pointer'>
              <img src={product.images[0]} className='w-32 my-2 h-32 object-cover mx-auto' />
              <div className='border border-black w-full'></div>
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
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider-container w-[80%] mx-auto border rounded-lg px-4 pb-8 my-4">
        <div className='my-3 flex gap-2 items-center'>
          <p className='text-3xl font-medium'>Asus</p>
          <span className='h-[30px] border bg-slate-400 mx-3'></span>
          <CiDeliveryTruck className='w-10 h-10 text-red-500' />
          <p className='text-lg font-medium'>Free Delivery</p>
        </div>
        <Slider {...settings}>
          {asus?.map((product) => (
            <div onClick={() => navigate(`/products/${product.productId}`)} key={product.productId} className='px-4 py-2 rounded-lg border hover:shadow-lg flex flex-col items-center h-[350px] hover:cursor-pointer'>
              <img src={product.images[0]} className='w-32 my-2 h-32 object-cover mx-auto' />
              <div className='border border-black w-full'></div>
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
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <p className='font-medium text-2xl mb-3'>Blog Discount</p>
        <div className='flex gap-1 justify-between'>
          {discountBanner.map((item) => (
            <div className='w-[24%]'>
              <img src={item} alt="" className='object-cover' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
