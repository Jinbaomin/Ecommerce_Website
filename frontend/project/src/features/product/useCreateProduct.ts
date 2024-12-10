import { useMutation } from "@tanstack/react-query"
import { callCreateProduct } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";
import { FormValuesProduct } from "../../pages/admin/Product/AddProduct";

export const useCreateProduct = () => {
  const { mutate: createNewProduct, isPending } = useMutation<IBackendResponse<IProduct>, AxiosError<IBackendResponse<any>>, FormValuesProduct>({
    mutationFn: async (data): Promise<any> => callCreateProduct(data),
    onSuccess: (data) => {
      nofitication(data.message, 'success');
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { createNewProduct, isPending };
}