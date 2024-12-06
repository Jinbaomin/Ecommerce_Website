import { useQuery } from "@tanstack/react-query"
import { callGetAllProduct, callGetProductById } from "../../config/api"
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";

export const useProductByID = () => {
  const productId = window.location.pathname.split('/')[2];
  const { data, isPending } = useQuery<IBackendResponse<IProduct>, AxiosError<any>>({
    queryKey: ['product', productId],
    queryFn: async (): Promise<any> => callGetProductById(productId),
    staleTime: Infinity
  });

  return { data, isPending };
}