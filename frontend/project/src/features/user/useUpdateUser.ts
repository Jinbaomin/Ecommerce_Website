import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IAccount, IBackendResponse, IUser } from "../../types/backend";
import { AxiosError } from "axios";
import { IFormInput } from "../../pages/client/Profile/Profile_Info";
import { callUpdateUser } from "../../config/api";
import { Flip, toast } from "react-toastify";
import { nofitication } from "../../helper/notificationHelper";

interface IUpdateUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending, isSuccess } = useMutation<IBackendResponse<IUser>, AxiosError<IBackendResponse<string>>, IUpdateUser>({
    mutationFn: async ({ id, fullName, email, phone }): Promise<any> => callUpdateUser(id, fullName, email, phone),
    onSuccess: (data) => {
      console.log(data);
      nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['account']
      });
    },
    onError: (error) => {
      console.log(error);
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { updateUser, isPending, isSuccess };
}
