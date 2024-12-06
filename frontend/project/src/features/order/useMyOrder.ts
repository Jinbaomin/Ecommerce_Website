import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getAllOrder } from "../../config/api"
import { IBackendResponse, ICart, IOrder } from "../../types/backend";
import { AxiosError } from "axios";

export const useMyOrder = () => {
  const { data, isPending } = useQuery<IBackendResponse<IOrder[]>, AxiosError<any>>({
    queryKey: ['myOrder'],
    queryFn: async (): Promise<any> => getAllOrder(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}