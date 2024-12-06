import { useMutation } from "@tanstack/react-query"
import { IBackendResponse } from "../../types/backend"
import { AxiosError } from "axios"
import { FormValues } from "../../pages/auth/VerifyOtp"
import { verifyOTP as verifyOTPApi } from "../../services/apiAuth"
import { Flip, toast } from "react-toastify"
import { useNavigate } from "react-router"
import { callVerifyOTP } from "../../config/api"

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  const { mutate: verifyOTP, isPending } = useMutation<IBackendResponse<{ isValid: boolean }>, AxiosError<IBackendResponse<any>>, FormValues>({
    mutationFn: async ({ email, otp }): Promise<any> => callVerifyOTP(email, otp),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });

      navigate('reset-new-password')
    },
    onError: (error) => {
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });
    }
  });

  return { verifyOTP, isPending };
}
