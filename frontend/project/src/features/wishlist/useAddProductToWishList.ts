import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callAddProductToWishList } from "../../config/api"
import { IBackendResponse, IUser } from "../../types/backend"
import { Axios, AxiosError } from "axios"
import { nofitication } from "../../helper/notificationHelper"

export const useAddProductToWishList = () => {
  const queryClient = useQueryClient();
  const { mutate: addProductToWishList, isPending } = useMutation<IBackendResponse<IUser>, AxiosError<IBackendResponse<any>>, { productId: string }>({
    mutationFn: async ({ productId }): Promise<any> => callAddProductToWishList(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['account']
      });
      // nofitication(data.message, 'success');
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { addProductToWishList, isPending };
}