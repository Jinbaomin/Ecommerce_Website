import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllProductInCart } from "../../config/api"
import { IBackendResponse, ICart } from "../../types/backend";
import { Axios, AxiosError } from "axios";

export const useMyCart = () => {
  const { data, isPending, isFetching } = useQuery<IBackendResponse<ICart>, AxiosError<any>>({
    queryKey: ['myCart'],
    queryFn: async (): Promise<any> => callGetAllProductInCart(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending, isFetching };
}