import { AxiosError } from "axios"
import { IBackendResponse } from "../../types/backend"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callLogout } from "../../config/api";
import { useNavigate } from "react-router";
import { Flip, toast } from "react-toastify";

// @ts-nocheck
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation<IBackendResponse<any>, AxiosError<string>>({
    mutationFn: async (): Promise<any> => callLogout(),
    onSuccess: (data) => {
      // console.log('remove token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
      // localStorage.setItem('access_token', data.data);
      // queryClient.invalidateQueries({
      //   queryKey: ['account']
      // });
      queryClient.removeQueries();
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: 'light',
        transition: Flip
      });
      navigate('/login');
    }
    
  });

  return { logout, isPending };
}