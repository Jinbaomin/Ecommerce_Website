import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callAddProductToCart } from "../../config/api"
import { IBackendResponse, ICart } from "../../types/backend";
import { AxiosError } from "axios";
import { nofitication } from "../../helper/notificationHelper";

interface IAddProductToCart {
  productId: string;
}

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  // const productId = window.location.pathname.split('/')[2];
  const { mutate: addProductToCart, isPending } = useMutation<IBackendResponse<ICart>, AxiosError<any>, { productId: string }>({
    mutationFn: async ({ productId }): Promise<any> => callAddProductToCart(productId),
    onSuccess: (data) => {
      nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['myCart']
      });
    }
  });

  return { addProductToCart, isPending };
}