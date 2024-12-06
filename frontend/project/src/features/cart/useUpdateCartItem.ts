import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callUpdateCartItem } from "../../config/api"
import { IBackendResponse, ICart, ICartItem } from "../../types/backend"
import { AxiosError } from "axios"
import { nofitication } from "../../helper/notificationHelper"

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCartItem, isPending } = useMutation<IBackendResponse<ICart>, AxiosError<IBackendResponse<any>>, { cartItemId: string, quantity: number }>({
    mutationFn: async ({ cartItemId, quantity }): Promise<any> => callUpdateCartItem(cartItemId, quantity),
    onSuccess: (data) => {
      //nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['myCart']
      });
    }
  });

  return { updateCartItem, isPending };
}