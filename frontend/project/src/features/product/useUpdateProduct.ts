import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callCreateProduct, callUpdateProduct } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";
import { FormValuesUpdateProduct } from "../../pages/admin/Product/EditProduct";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation<IBackendResponse<IProduct>, AxiosError<IBackendResponse<any>>, FormValuesUpdateProduct>({
    mutationFn: async (data): Promise<any> => callUpdateProduct(data),
    onSuccess: (data) => {
      nofitication(data.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['product', data.data.productId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { updateProduct, isPending };
}