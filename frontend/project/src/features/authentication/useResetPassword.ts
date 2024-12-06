import { useMutation } from "@tanstack/react-query"
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import { IBackendResponse } from "../../types/backend";
import { AxiosError } from "axios";
import { Flip, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { callResetPassword } from "../../config/api";

interface IResetPassword {
  email: string;
  newPassword: string;
}

export const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation<IBackendResponse<any>, AxiosError<IBackendResponse<any>>, IResetPassword>({
    mutationFn: async ({ email, newPassword }): Promise<any> => callResetPassword(email, newPassword),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      })

      navigate('/');
    },
    onError: (error) => {
      console.log(error.response?.data.message);
    }
  });

  return { resetPassword, isPending };
}