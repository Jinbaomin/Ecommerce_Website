import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllUser } from "../../config/api"
import { IBackendResponse, IUser, PaginationResult } from "../../types/backend";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useGetAllUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('limit') || 5;
  const search = searchParams.get('search') || '';

  const query = `?page=${page}&pageSize=${pageSize}&search=${search}`;

  const { data, isPending } = useQuery<IBackendResponse<PaginationResult<IUser[]>>, AxiosError<IBackendResponse<any>>>({
    queryKey: ['users', query],
    queryFn: async (): Promise<any> => callGetAllUser(query),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}