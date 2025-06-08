import React, { Fragment } from 'react'
import Home from './pages/client/Home'
import Contact from './pages/client/Contact'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/client/Layout'
import Blog from './pages/client/Blog'
import Profile from './pages/client/Profile/Profile'
import Profile_Info from './pages/client/Profile/Profile_Info'
import Profile_Payment from './pages/client/Profile/Profile_Payment'
import Profile_Order from './pages/client/Profile/Profile_Order'
import Profile_Notification from './pages/client/Profile/Profile_Notification'
import Profile_Security from './pages/client/Profile/Profile_Security'
import NotFound from './pages/client/NotFound'
import Profile_Discount from './pages/client/Profile/Profile_Discount'
import Product from './pages/client/Product/Product'
import Profile_WishList from './pages/client/Profile/Profile_WishList'
import Cart from './pages/client/Cart'
import Checkout from './pages/client/Checkout'
import ResetPassword from './pages/auth/VerifyEmail'
import VerifyCode from './pages/auth/VerifyOtp'
import NewPassword from './pages/auth/ResetPassword'
import LayoutApp from './components/share/LayoutApp'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Detail_Product from './pages/client/Product/Detail_Product'
import ReceiptOrder from './pages/client/ReceiptOrder'
import Detail_Order from './pages/client/Order/Detail_Order'
import LayoutAdmin from './components/admin/LayoutAdmin'
// import Dashboard from './pages/admin/Dashboard'
import AdminProduct from './pages/admin/Product/AdminProduct'
import AdminOrder from './pages/admin/Order/AdminOrder'
import AdminUser from './pages/admin/AdminUser'
import AdminCategory from './pages/admin/Category/AdminCategory'
import AddProduct from './pages/admin/Product/AddProduct'
import AdminDetailOrder from './pages/admin/Order/AdminDetailOrder'
import AddCategory from './pages/admin/Category/AddCategory'
import EditCateogory from './pages/admin/Category/EditCategory'
import EditProduct from './pages/admin/Product/EditProduct'
import AdminCustomer from './pages/admin/Customer/AdminCustomer'
import AdminDetailCustomer from './pages/admin/Customer/AdminDetailCustomer'
// import Dashboard from './pages/admin/Dashboard/dashboard';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import OrderConfirmation from './pages/client/OrderConfirmation'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 100 * 60 * 60 * 24
    }
  }
});

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutApp>
          <Layout />
        </LayoutApp>
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'products',
          element: <Product />
        },
        {
          path: 'products/:id',
          element: <Detail_Product />
        },
        {
          path: 'blog',
          element: <Blog />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'checkout',
          element: <Checkout />
        },
        {
          path: 'receipt-order/:id',
          element: <ReceiptOrder />
        },
        {
          path: 'order-confirmation/:id',
          element: <OrderConfirmation />
        },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              index: true,
              element: <Navigate replace to={'personal-info'} />
            },
            {
              path: 'personal-info',
              element: <Profile_Info />
            },
            {
              path: 'payment',
              element: <Profile_Payment />
            },
            {
              path: 'track-order',
              element: <Profile_Order />
            },
            {
              path: 'track-order/:id',
              element: <Detail_Order />
            },
            {
              path: 'wish-list',
              element: <Profile_WishList />
            },
            {
              path: 'setting',
              element: <Profile_Notification />
            },
            {
              path: 'security',
              element: <Profile_Security />
            },
            {
              path: 'discount',
              element: <Profile_Discount />
            }
          ]
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <LayoutApp>
          <LayoutAdmin />
        </LayoutApp>
      ),
      children: [
        {
          index: true,
          element: <Navigate replace to={'dashboard'} />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'product',
          element: <AdminProduct />
        },
        {
          path: 'product/add',
          element: <AddProduct />
        },
        {
          path: 'product/:id/edit',
          element: <EditProduct />
        },
        {
          path: 'category',
          element: <AdminCategory />
        },
        {
          path: 'category/add',
          element: <AddCategory />
        },
        {
          path: 'category/:id/edit',
          element: <EditCateogory />
        },
        {
          path: 'order',
          element: <AdminOrder />
        },
        {
          path: 'order/:id',
          element: <AdminDetailOrder />
        },
        {
          path: 'customer',
          element: <AdminCustomer /> 
        },
        {
          path: 'customer/:id',
          element: <AdminDetailCustomer /> 
        },
        {
          path: 'user',
          element: <AdminUser />
        },
      ]
    },
    {
      path: 'login',
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        },
        {
          path: 'verify-otp',
          children: [
            {
              index: true,
              element: <VerifyCode />
            },
            {
              path: 'reset-new-password',
              element: <NewPassword />
            }
          ]
        }
      ]
    },
    {
      path: 'register',
      element: <Register />
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path='contact' element={<Contact />} />
    //       <Route path='product' element={<Product />} />
    //       <Route path='blog' element={<Blog />} />
    //       <Route path='cart' element={<Cart />} />
    //       <Route path='checkout' element={<Checkout />} />
    //       <Route path='*' element={<NotFound />} />
    //     </Route>
    //     <Route path='profile' element={<Profile />}>
    //       <Route index element={<Navigate replace to={'personal-info'} />} />
    //       <Route path='personal-info' element={<Profile_Info />} />
    //       <Route path='payment' element={<Profile_Payment />} />
    //       <Route path='order' element={<Profile_Order />} />
    //       <Route path='wish-list' element={<Profile_WishList />} />
    //       <Route path='notification' element={<Profile_Notification />} />
    //       <Route path='security' element={<Profile_Security />} />
    //       <Route path='discount' element={<Profile_Discount />} />
    //     </Route>
    //     <Route path='login'>
    //       <Route index element={<Login />} />
    //       <Route path='reset-password' element={<ResetPassword />} />
    //       <Route path='verify-otp'>
    //         <Route index element={<VerifyCode />} />
    //         <Route path='reset-new-password' element={<NewPassword />} />
    //       </Route>
    //     </Route>
    //     <Route path='register' element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App;
