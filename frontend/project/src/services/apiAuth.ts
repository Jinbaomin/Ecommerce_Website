import { callCurrentUser, callLogin, callRegister, callResetPassword, callVerifyEmail, callVerifyOTP } from "../config/api"

export const login = async (email: string, password: string) => {
  const res = await callLogin(email, password);
  return res.data;
}

export const register = async (fullName: string, userName: string, email: string, phone: string, password: string) => {
  const res = await callRegister(fullName, userName, email, phone, password);
  return res.data;
}

export const getCurrentUser = async () => {
  const res = await callCurrentUser();
  return res.data;
}

export const verifyEmail = async (email: string) => {
  const res = await callVerifyEmail(email);
  return res.data;
}

export const verifyOTP = async (email: string, otp: string) => {
  const res = await callVerifyOTP(email, otp);
  return res.data;
}

export const resetPassword = async (email: string, newPassword: string) => {
  const res = await callResetPassword(email, newPassword);
  return res.data;
}