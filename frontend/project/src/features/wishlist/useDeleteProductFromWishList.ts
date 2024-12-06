import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callAddProductToWishList, callDeleteCartItm, callDeleteProductFromWishList } from "../../config/api"
import { IBackendResponse, IUser } from "../../types/backend"
import { AxiosError } from "axios"
import { nofitication } from "../../helper/notificationHelper"

export const useDeleteProductFromWishList = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProductFromWishList, isPending } = useMutation<IBackendResponse<IUser>, AxiosError<IBackendResponse<any>>, { productId: string }>({
    mutationFn: async ({ productId }): Promise<any> => callDeleteProductFromWishList(productId),
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

  return { deleteProductFromWishList, isPending };
}