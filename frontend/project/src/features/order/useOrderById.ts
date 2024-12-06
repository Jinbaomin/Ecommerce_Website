import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetOrderById, getAllOrder } from "../../config/api"
import { IBackendResponse, ICart, IOrder } from "../../types/backend";
import { AxiosError } from "axios";

export const useOrderById = () => {
  const orderId = window.location.pathname.split('/')[3];

  const { data, isPending } = useQuery<IBackendResponse<IOrder>, AxiosError<any>>({
    queryKey: ['myOrder', orderId],
    queryFn: async (): Promise<any> => callGetOrderById(orderId),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}