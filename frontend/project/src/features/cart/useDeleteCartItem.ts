import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callDeleteCartItm, callUpdateCartItem } from "../../config/api"
import { IBackendResponse, ICart, ICartItem } from "../../types/backend"
import { AxiosError } from "axios"
import { nofitication } from "../../helper/notificationHelper"

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCartItem, isPending } = useMutation<IBackendResponse<ICart>, AxiosError<IBackendResponse<any>>, { cartItemId: string }>({
    mutationFn: async ({ cartItemId }): Promise<any> => callDeleteCartItm(cartItemId),
    onSuccess: (data) => {
      //nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['myCart']
      });
    }
  });

  return { deleteCartItem, isPending };
}