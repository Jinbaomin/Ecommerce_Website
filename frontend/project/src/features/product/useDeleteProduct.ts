import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { callDeleteProduct, callGetAllProduct } from "../../config/api"
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";
import { nofitication } from "../../helper/notificationHelper";

interface IDeleteProduct {
  productId: number;
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending } = useMutation<IBackendResponse<IProduct[]>, AxiosError<any>, IDeleteProduct>({
    mutationFn: async ({ productId }): Promise<any> => callDeleteProduct(productId),
    onSuccess: (data) => {
      nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { deleteProduct, isPending };
}