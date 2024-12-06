import { IAccount, IBackendResponse, ICart, ICartItem, IGetAccount, IOrder, IProduct, IUser } from "../types/backend";
import { instance as axios } from "./axios-customize";

// Module Auth
export const callRegister = async (fullName: string, userName: string, email: string, phone: string, password: string) => {
  return await axios.post<IBackendResponse<IUser>>('/auth/register', { fullName, userName, email, phone, password });
}

export const callLogin = async (email: string, password: string) => {
  return await axios.post<IBackendResponse<IAccount>>('/auth/login', { email, password });
}

export const callCurrentUser = async () => {
  return await axios.get<IBackendResponse<IGetAccount>>('/auth/account');
}

export const callVerifyEmail = async (email: string) => {
  return axios.post<IBackendResponse<{ email: string }>>('/auth/otp/generate', { email });
}

export const callVerifyOTP = async (email: string, otp: string) => {
  return axios.post<IBackendResponse<{ isValid: boolean }>>('/auth/otp/validate', { email, otp });
}

export const callResetPassword = async (email: string, newPassword: string) => {
  return axios.post<IBackendResponse<{ email: string }>>('/auth/password', { email, newPassword });
}

export const callLogout = async () => {
  return axios.post<IBackendResponse<string>>('/auth/logout');
}

// Module User
export const callChangePassword = async (oldPassword: string, newPassword: string) => {
  return axios.post('/user/password', { oldPassword, newPassword });
}

export const callUpdateUser = async (id: string, fullName: string, email: string, phone: string) => {
  return axios.post<IBackendResponse<IUser>>(`/user/${id}`, { fullName, email, phone });
}

// Wish list
export const callAddProductToWishList = async (productId: string) => {
  return axios.post<IBackendResponse<IUser>>(`/wishlist/${productId}`);
}

export const callDeleteProductFromWishList = async (productId: string) => {
  return axios.delete<IBackendResponse<IUser>>(`/wishlist/${productId}`);
}


// Module Product
export const callGetAllProduct = async () => {
  return axios.get<IBackendResponse<IProduct[]>>('/product');
}

export const callGetProductById = async (productId: string) => {
  return axios.get<IBackendResponse<IProduct>>(`/product/${productId}`);
}

// Cart
export const callGetAllProductInCart = async () => {
  return axios.get<IBackendResponse<ICart>>('/cart');
}

export const callAddProductToCart = async (productId: string) => {
  console.log(productId);
  return await axios.post<IBackendResponse<ICart>>('/cart', { productId });
}

export const callUpdateCartItem = async (cartItemId: string, quantity: number) => {
  return await axios.put<IBackendResponse<ICart>>(`/cart/cartItem/${cartItemId}`, { quantity });
}

export const callDeleteCartItm = async (cartItemId: string) => {
  return await axios.delete<IBackendResponse<ICart>>(`/cart/cartItem/${cartItemId}`);
}

// Order
export const getAllOrder = async () => {
  return axios.get<IBackendResponse<IOrder[]>>('/order');
}

export const callCheckOut = async (total: number, shipTo: string, shippingMethod: string) => {
  return axios.post<IBackendResponse<IOrder>>(`/order`, { total, shipTo, shippingMethod });
}

export const callGetOrderById = async (orderId: string) => {
  return axios.get<IBackendResponse<IOrder>>(`/order/${orderId}`);
}