import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllOrder } from "../../config/api"
import { IBackendResponse, ICart, IOrder, PaginationResult } from "../../types/backend";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useAllOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;
  const sortedBy = searchParams.get('sortedBy') || 'createdAt,asc';
  const status = searchParams.get('status') || '';
  const searchByEmail = searchParams.get('searchByEmail') || '';

  const query = `?page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&status=${status}&searchByEmail=${searchByEmail}`;

  const { data, isPending, isFetching } = useQuery<IBackendResponse<PaginationResult<IOrder[]>>, AxiosError<any>>({
    queryKey: ['allOrder', query],
    queryFn: async (): Promise<any> => callGetAllOrder(query),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending, isFetching };
}