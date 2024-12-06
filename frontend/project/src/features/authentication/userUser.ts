import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"
import { IAccount, IBackendResponse, IGetAccount } from "../../types/backend";
import { AxiosError } from "axios";
import { callCurrentUser } from "../../config/api";
import { toast } from "react-toastify";

export const useUser = () => {
  const { data, isPending, isFetching, isLoading } = useQuery<IBackendResponse<IAccount>, AxiosError<IBackendResponse<any>>, IBackendResponse<IAccount>>({
    queryKey: ['account'],
    queryFn: async (): Promise<any> => callCurrentUser(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending, isFetching, isLoading, isAuthenticated: data?.statusCode == 200 };
}