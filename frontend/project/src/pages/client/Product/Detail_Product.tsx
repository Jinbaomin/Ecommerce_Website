import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Stars from '../../../ui/Stars';
import { useProductByID } from '../../../features/product/useProductByID';
import FullPage from '../../../ui/FullPage';
import Spinner from '../../../ui/Spinner';
import { convertCurrency } from '../../../helper/helper';
import { useAddProductToCart } from '../../../features/cart/useAddProductToCart';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '208px',
  width: '240px',
  color: '#fff',
  lineHeight: '208px',
  textAlign: 'center',
  background: '#364d79',
};

const Detail_Product: React.FC = () => {
  const { data, isPending } = useProductByID();
  const { addProductToCart, isPending: isPendingToAdd } = useAddProductToCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isPending) {
    return <FullPage>
      <Spinner size={50} />
    </FullPage>
  }

  const product = data?.data;

  return (
    <div className='px-1 py-5'>
      <div className='flex gap-4'>
        <div className='border-r px-4 flex justify-center items-center w-[40%]'>
          <div className='w-full'>
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className='flex justify-center items-center'>
                    <img src={'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-2_3d459fa64f614b829d9308de0ae6d3fe_5a34f8ad886444b9971d5f0b275f0dfa_grande.png'}
                      className='h-64 object-contain' alt='product'
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className='flex justify-center items-center'>
                    <img src={'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-3_b7e4e3a142d14762a4a3f84b4292239d_c558667bbfac4bcd95b2d3b59926bf93_grande.png'}
                      className='h-64 object-contain' alt='product'
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className='flex justify-center items-center'>
                    <img src={'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-4_e7807be07b974599a8950f81b10af355_cc8f7ced7f4c48769a75875bc42e5f9d_grande.png'}
                      className='h-64 object-contain' alt='product'
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className='flex justify-center items-center'>
                    <img src={'https://product.hstatic.net/200000722513/product/u-16gpu-16gb-512gb-silver-mphh3sa-a-8_a09de18a18ce463a8224ccbd10aede6a_c1c17e2cb7d349a690152a72969ce80b_grande.png'}
                      className='h-64 object-contain' alt='product'
                    />
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev bg-secondary-subtle" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
                  <FaArrowLeft />
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
                  <FaArrowRight />
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className='w-[40%] space-y-4'>
          <p className='text-2xl font-medium'>{product?.productName}</p>
          <div className='flex items-center space-x-2'>
            <p className='text-2xl font-semibold text-red-500'>{convertCurrency(product?.salePrice)} VND</p>
            <p className='text-base line-through text-gray-500'>{convertCurrency(product?.price)} VND</p>
          </div>
          <div className='flex'>
            <p className='mr-3 flex items-center'>
              <Stars rating={4} />
            </p>
            <span className='border-r border-black'></span>
            <p className='ml-3 text-lg'>In Stock: {product?.quantity}</p>
          </div>
          {/* <div className='space-y-1'>
            <p className='text-gray-500'>Brand: <span className='text-black'>{product?.productInfo.brand}</span></p>
            <p className='text-gray-500'>Screen size: <span className='text-black'>{product?.productInfo.screenSize}</span></p>
            <p className='text-gray-500'>Hard Disk Size: <span className='text-black'>{product?.productInfo.rom}</span></p>
            <p className='text-gray-500'>Ram: <span className='text-black'>{product?.productInfo.ram}</span></p>
            <p className='text-gray-500'>CPU Model: <span className='text-black'>{product?.productInfo.cpu}</span></p>
          </div> */}
          <button onClick={() => addProductToCart({ productId: product?.productId })} className='bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white rounded-lg flex justify-center gap-2'>
            {isPendingToAdd ? (
              <>
                <Spinner size={20} />
                <p>Loading...</p>
              </>
            ) : (
              'Add to Cart'
            )
            }
          </button>
        </div>
      </div>
      <div className='py-5'>
        <p className='text-3xl text-center font-medium mb-4'>Thông tin chi tiết sản phẩm</p>
        <div className='flex justify-center'>
          <table className='w-[70%] border'>
            <tr className='flex text-xl odd:bg-white even:bg-slate-100'>
              <td className='border w-1/2 p-2'>CPU</td>
              <td className='border w-1/2 p-2'>{product?.productInfo.cpu}</td>
            </tr>
            <tr className='flex text-xl odd:bg-white even:bg-slate-100'>
              <td className='border w-1/2 p-2'>Màn hình</td>
              <td className='border w-1/2 p-2'>{product?.productInfo.screenSize}</td>
            </tr>
            <tr className='flex text-xl odd:bg-white even:bg-slate-100'>
              <td className='border w-1/2 p-2'>RAM</td>
              <td className='border w-1/2 p-2'>{product?.productInfo.ram}</td>
            </tr>
            <tr className='flex text-xl odd:bg-white even:bg-slate-100'>
              <td className='border w-1/2 p-2'>Dung lượng pin</td>
              <td className='border w-1/2 p-2'>{product?.productInfo.batteryLife}</td>
            </tr>
            <tr className='flex text-xl odd:bg-white even:bg-slate-100'>
              <td className='border w-1/2 p-2'>Bộ nhớ</td>
              <td className='border w-1/2 p-2'>{product?.productInfo.rom}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className='mt-4'>
        <p className='font-semibold text-2xl mb-2'>Đánh giá chi tiết {product?.productName}</p>
        <p className='text-xl text-gray-700'>
          {product?.description}
          {/* Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A mang đến một siêu phẩm laptop học tập và làm việc thế hệ mới. Thừa hưởng vẻ đẹp sang trọng từ thương hiệu Apple cùng hiệu năng vượt trội được xử lý từ con chip M2 mạnh mẽ. Hứa hẹn đây sẽ là một trong những chiếc laptop làm mưa làm gió trên thị trường. Cùng GEARVN tìm hiểu xem Macbook Pro 14 M2 Pro này có gì đáng mong đợi nhé.
          <br />
          Macbook Pro 14 M2 Pro để đánh giá về vẻ bề ngoài so với những phiên bản trước đây có lẽ không có sự thay đổi gì nhiều. Ngoại hình vẫn giữ được nét đẹp sang trọng với tông màu Silver đặc trưng. Điểm khác biệt mà bạn có thể cảm nhận được trên chiếc Macbook nhà Apple này là hiệu năng mạnh mẽ từ con chip M2. Với cấu trúc CPU 10 nhân mang đến tốc độ xử lý công việc trôi chảy hơn bao giờ hết. Kết hợp cùng 16 nhân GPU cho kết xuất đồ họa đẹp mắt. Đáp ứng mọi nhu cầu thiết kế hình ảnh, dựng video, giải trí,...
          <br />
          Macbook Pro 14 M2 Pro trang bị quạt tản nhiệt tiên tiến, nhanh chóng làm mát, lưu thông luồng khí để bạn luôn có được hiệu năng ổn định trong thời gian dài. Sẵn sàng cho những công việc cần hoạt động liên tục, những tác vụ đòi hỏi khả năng xử lý cao mà máy vẫn hết sức mượt mà. */}
        </p>
      </div>
    </div>
  )
}

export default Detail_Product
