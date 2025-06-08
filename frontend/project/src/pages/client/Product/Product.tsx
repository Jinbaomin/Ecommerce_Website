import React, { useRef, useState } from 'react'
import { asset } from '../../../assets/asset'
import { useNavigate } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../features/product/useProducts';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { calculateDiscountPercentage, convertCurrency } from '../../../helper/helper';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useUser } from '../../../features/authentication/userUser';
import { useAddProductToCart } from '../../../features/cart/useAddProductToCart';
import { useAddProductToWishList } from '../../../features/wishlist/useAddProductToWishList';
import { useDeleteProductFromWishList } from '../../../features/wishlist/useDeleteProductFromWishList';
import { Pagination, PaginationProps, Select, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaStar } from "react-icons/fa6";

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
];

const brands = [
  {
    id: 1,
    name: 'Apple',
    value: 'apple',
  },
  {
    id: 2,
    name: 'MSI',
    value: 'msi',
  },
  {
    id: 3,
    name: 'ASUS',
    value: 'asus',
  },
  {
    id: 4,
    name: 'DELL',
    value: 'dell',
  },
]

const rams = [
  {
    id: 0,
    name: '8GB',
    value: '8GB'
  },
  {
    id: 1,
    name: '16GB',
    value: '16GB'
  },
  {
    id: 2,
    name: '32GB',
    value: '32GB'
  },
];

const roms = [
  {
    id: 0,
    name: '64GB',
    value: '64GB'
  },
  {
    id: 1,
    name: '128GB',
    value: '128GB'
  },
  {
    id: 2,
    name: '256GB',
    value: '256GB'
  },
  {
    id: 3,
    name: '512GB',
    value: '512GB'
  },
]

const Product: React.FC = () => {
  const navigate = useNavigate();
  // const handleSearchByParam = (param: string) => {
  //   navigate(`/product?category=${param}`);
  // }

  let brand = useRef<string[]>([]);
  let ram = useRef<string[]>([]);
  let rom = useRef<string[]>([]);

  const { data, isPending } = useProducts();
  const { data: dataUser, isFetching } = useUser();
  const { addProductToWishList } = useAddProductToWishList();
  const { deleteProductFromWishList } = useDeleteProductFromWishList();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: {
      search: ''
    }
  });

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 8;

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    // console.log(current, pageSize);
    setSearchParams(searchParams => {
      searchParams.set('page', current.toString());
      searchParams.set('limit', pageSize.toString());
      return searchParams;
    });
  };

  const handleSearch: SubmitHandler<{ search: string }> = ({ search }) => {
    setSearchParams(searchParams => {
      searchParams.set('name', search);
      return searchParams;
    });
  }

  const handleFilterBrand = (e: any) => {
    const value = e.target.value;
    if (brand.current.includes(value)) {
      brand.current = brand.current.filter(item => item !== value);
    } else {
      brand.current = [...brand.current, value];
    }

    setSearchParams(searchParams => {
      searchParams.set('brands', brand.current.join(','));
      return searchParams;
    });
  }

  const handleFilterByRam = (e: any) => {
    const value = e.target.value;
    if (ram.current.includes(value)) {
      ram.current = ram.current.filter(item => item !== value);
    } else {
      ram.current = [...ram.current, value];
    }

    setSearchParams(searchParams => {
      searchParams.set('ram', ram.current.join(','));
      return searchParams;
    });
  }

  const handleFilterByRom = (e: any) => {
    const value = e.target.value;
    if (rom.current.includes(value)) {
      rom.current = rom.current.filter(item => item !== value);
    } else {
      rom.current = [...rom.current, value];
    }

    setSearchParams(searchParams => {
      searchParams.set('rom', rom.current.join(','));
      return searchParams;
    });
  }

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
      {/* <div className='flex flex-row gap-2 justify-evenly items-center'>
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleSearchByParam(category.param)} className='flex flex-col gap-1 items-center p-4 border rounded-lg hover:cursor-pointer shadow-md hover:bg-blue-300'>
            <img src={category.icon} alt={category.title} className='w-10 h-10 object-cover' />
            <p className='text-base'>{category.title}</p>
          </div>
        ))}
      </div> */}
      <div className='py-3 flex justify-between items-center gap-4 w-[95%] mx-auto mt-3'>
        <form onSubmit={handleSubmit(handleSearch)}>
          <label className='text-lg font-medium mr-2'>Search</label>
          <input {...register('search')} type="text" className='border-[1px] border-solid border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 mr-2' placeholder='Search product' />
          <button className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>Search</button>
        </form>
        <div className='flex gap-4'>
          {/* <div>
              <label className='text-lg font-medium mr-2'>Filter</label>
              <Space wrap>
                <Select
                  defaultValue={'ALL'}
                  // placeholder='Select status'
                  style={{ width: 250 }}
                  onChange={(status) => setSearchParams(searchParams => {
                    searchParams.set('stock', status);
                    return searchParams;
                  })}
                  options={[
                    { value: '', label: 'ALL' },
                    { value: 'in_stock', label: 'In Stock' },
                    { value: 'out_of_stock', label: 'Out Of Stock' }
                  ]}
                />
              </Space>
            </div> */}
          <div>
            <label className='text-lg font-medium mr-2'>Sort By</label>
            <Space wrap>
              <Select
                defaultValue={'Default'}
                // placeholder='Select status'
                style={{ width: 250 }}
                onChange={(sortedBy) => setSearchParams(searchParams => {
                  searchParams.set('sortedBy', sortedBy);
                  return searchParams;
                })}
                options={[
                  // { value: 'createdAt,desc', label: 'Sort by latest order' },
                  // { value: 'createdAt,asc', label: 'Sort by oldest order' },
                  { value: 'price,asc', label: 'Sort by ascending price' },
                  { value: 'price,desc', label: 'Sort by descending price' }
                ]}
              />
            </Space>
          </div>
        </div>
      </div>
      <div className='py-2 flex flex-wrap items-center gap-4 w-[95%] mx-auto mt-3'>
        <div>
          <label className='text-lg font-medium mr-2'>Min price</label>
          <Space wrap>
            <Select
              defaultValue={'Default'}
              // placeholder='Select status'
              style={{ width: 250 }}
              onChange={(sortedBy) => setSearchParams(searchParams => {
                searchParams.set('minPrice', sortedBy);
                return searchParams;
              })}
              options={[
                // { value: 'createdAt,desc', label: 'Sort by latest order' },
                // { value: 'createdAt,asc', label: 'Sort by oldest order' },
                { value: '5000000', label: '5.000.000' },
                { value: '10000000', label: '10.000.000' },
                { value: '15000000', label: '15.000.000' },
                { value: '20000000', label: '20.000.000' },
              ]}
            />
          </Space>
        </div>
        <div>
          <label className='text-lg font-medium mr-2'>Max price</label>
          <Space wrap>
            <Select
              defaultValue={'Default'}
              // placeholder='Select status'
              style={{ width: 250 }}
              onChange={(sortedBy) => setSearchParams(searchParams => {
                searchParams.set('maxPrice', sortedBy);
                return searchParams;
              })}
              options={[
                // { value: 'createdAt,desc', label: 'Sort by latest order' },
                // { value: 'createdAt,asc', label: 'Sort by oldest order' },
                { value: '5000000', label: '5.000.000' },
                { value: '10000000', label: '10.000.000' },
                { value: '15000000', label: '15.000.000' },
                { value: '20000000', label: '20.000.000' },
                { value: '25000000', label: '25.000.000' },
                { value: '30000000', label: '30.000.000' },
              ]}
            />
          </Space>
        </div>
      </div>
      <div className='flex flex-row items-start px-8 gap-4 py-3'>
        <div className='sticky top-3 w-[17%] border p-4 rounded-xl '>
          <p className='font-medium text-xl'>Filter</p>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>Brand</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              {brands.map(brand => (
                <div key={brand.id} className='flex items-center gap-2 text-xl'>
                  <input onChange={(e) => handleFilterBrand(e)} type='checkbox' className='w-4 h-4 rounded-lg' value={brand.value} />
                  <label className='text-base'>{brand.name}</label>
                </div>
              ))}
              {/* <div className='flex items-center gap-2 text-xl'>
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
              </div> */}
            </div>
          </div>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>RAM</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              {rams.map(item => (
                <div key={item.id} className='flex items-center gap-2 text-xl'>
                  <input onChange={(e) => handleFilterByRam(e)} type='checkbox' className='w-4 h-4 rounded-lg' value={item.value} />
                  <label className='text-base'>{item.name}</label>
                </div>
              ))}
              {/* <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'64GB'} />
                <label className='text-base'>64GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'32GB'} />
                <label className='text-base'>32GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'16GB'} />
                <label className='text-base'>16GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'8GB'} />
                <label className='text-base'>8GB</label>
              </div> */}
            </div>
          </div>
          <hr className='my-2' />
          <div>
            <p className='mt-2'>Drive Size</p>
            <div className='flex flex-col items-start space-y-2 mt-2'>
              {roms.map(item => (
                <div key={item.id} className='flex items-center gap-2 text-xl'>
                  <input onChange={(e) => handleFilterByRom(e)} type='checkbox' className='w-4 h-4 rounded-lg' value={item.value} />
                  <label className='text-base'>{item.name}</label>
                </div>
              ))}
              {/* <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'64GB'} />
                <label className='text-base'>64GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'128GB'} />
                <label className='text-base'>128GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'256GB'} />
                <label className='text-base'>256GB</label>
              </div>
              <div className='flex items-center gap-2 text-xl'>
                <input type='checkbox' className='w-4 h-4 rounded-lg' value={'512GB'} />
                <label className='text-base'>512GB</label>
              </div> */}
            </div>
          </div>
        </div>
        <div className='flex-1 grid grid-cols-4 gap-3'>
          {data?.data.data.map((product) => (
            <div onClick={() => navigate(`/products/${product.productId}`)} key={product.productId} className='px-4 py-2 rounded-lg border hover:shadow-lg flex flex-col items-center min-h-[270px] hover:cursor-pointer'>
              <img src={product.images[0]} className='w-32 my-2 h-32 object-cover' />
              <span className='border border-black w-full'></span>
              <p className='text-sm font-medium mt-3 line-clamp-3 h-1/4'>{product.productName}</p>
              <div className='flex justify-between w-full mt-3'>
                <div className='flex flex-col'>
                  <p className='text-gray-500 font-medium line-through text-sm'>{convertCurrency(product.price)} VND</p>
                  <p className='text-red-500 font-medium text-base flex items-center gap-2'>
                    {convertCurrency(product.salePrice)} VND
                    <span className='text-xs p-[2px] border-1 border-red-500 bg-red-200 outline-none'>-{calculateDiscountPercentage(product.price, product.salePrice)}%</span>
                  </p>
                </div>
                {/* <button className='bg-blue-500 hover:bg-blue-600 px-3 py-2 text-xs text-white rounded-lg'>
                  Add to cart
                </button> */}
              </div>
              <div className='flex justify-between items-center mt-2 w-full'>
                <div className='flex gap-1 text-yellow-500'>
                  <span className='font-medium'>5</span>
                  <FaStar className='w-5 h-5' />
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-sm text-gray-500'>Love</span>
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
      <div className='py-3 px-4'>
        <Pagination
          align='end'
          showSizeChanger
          pageSizeOptions={['8', '12', '16', '20', '24']}
          onChange={onShowSizeChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={Number(page)}
          defaultPageSize={Number(pageSize)}
          total={data?.data?.meta?.total}
        />
      </div>
    </div>
  )
}

export default Product
