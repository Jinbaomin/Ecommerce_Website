import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllProduct } from "../../config/api"
import { IBackendResponse, IProduct, PaginationResult } from "../../types/backend";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;
  const sortedBy = searchParams.get('sortedBy') || 'createdAt,asc';
  const stock = searchParams.get('stock') || '';
  const name = searchParams.get('name') || '';

  const query = `?page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&stock=${stock}&name=${name}`;
  // const query = `?page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&name=${name}`;

  const { data, isPending } = useQuery<IBackendResponse<PaginationResult<IProduct[]>>, AxiosError<any>>({
    queryKey: ['products', query],
    queryFn: async (): Promise<any> => callGetAllProduct(query),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}