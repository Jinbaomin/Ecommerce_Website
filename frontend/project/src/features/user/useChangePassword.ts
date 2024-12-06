import { useMutation } from "@tanstack/react-query"
import { IBackendResponse } from "../../types/backend"
import { AxiosError } from "axios"
import { callChangePassword } from "../../config/api";
import { IChangePassword } from "../../pages/client/Profile/Profile_Security";
import { Flip, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const useChangePassword = () => {

  const { mutate: changePassword, isPending, isSuccess } = useMutation<IBackendResponse<any>, AxiosError<IBackendResponse<any>>, IChangePassword>({
    mutationFn: async ({ oldPassword, newPassword }): Promise<any> => await callChangePassword(oldPassword, newPassword),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });
    }
  });

  return { changePassword, isPending, isSuccess };
}