import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllMyOrder, callGetOrderByUserId } from "../../config/api"
import { IBackendResponse, ICart, IOrder, PaginationResult } from "../../types/backend";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useGetOrderByUserId = () => {
  const userId = window.location.pathname.split('/')[3];
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;

  const query = `?page=${page}&pageSize=${pageSize}`;

  const { data, isPending } = useQuery<IBackendResponse<PaginationResult<IOrder[]>>, AxiosError<any>>({
    queryKey: ['order', 'user', userId, query],
    queryFn: async (): Promise<any> => callGetOrderByUserId(userId, query),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}