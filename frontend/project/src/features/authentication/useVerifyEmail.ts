import { useMutation } from "@tanstack/react-query"
import { IBackendResponse } from "../../types/backend"
import { AxiosError } from "axios"
import { FormValues } from "../../pages/auth/VerifyEmail";
import { Flip, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { verifyEmail as verifyEmailApi } from "../../services/apiAuth";
import { callVerifyEmail } from "../../config/api";

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending } = useMutation<IBackendResponse<{ email: string }>, AxiosError<IBackendResponse<any>>, FormValues>({
    mutationFn: async ({ email }): Promise<any> => callVerifyEmail(email),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });

      localStorage.setItem('email_reset', data.data.email);
      navigate('/login/verify-otp');
    },
    onError: (error) => {
      // console.log(error.response?.data.message);
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });
    }
  });

  return { verifyEmail, isPending };
}