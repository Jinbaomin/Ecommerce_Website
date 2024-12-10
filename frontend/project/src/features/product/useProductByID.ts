import { useQuery } from "@tanstack/react-query"
import { callGetAllProduct, callGetProductById } from "../../config/api"
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";

export const useProductByID = () => {
  const productId = window.location.pathname.startsWith('/admin') ?  window.location.pathname.split('/')[3] : window.location.pathname.split('/')[2];
  const { data, isPending, isFetching } = useQuery<IBackendResponse<IProduct>, AxiosError<any>>({
    queryKey: ['product', productId],
    queryFn: async (): Promise<any> => callGetProductById(productId),
    staleTime: Infinity
  });

  return { data, isPending, isFetching };
}