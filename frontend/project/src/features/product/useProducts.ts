import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllProduct } from "../../config/api"
import { IBackendResponse, IProduct } from "../../types/backend";
import { AxiosError } from "axios";

export const useProducts = () => {
  const { data, isPending } = useQuery<IBackendResponse<IProduct[]>, AxiosError<any>>({
    queryKey: ['products'],
    queryFn: async (): Promise<any> => callGetAllProduct(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}