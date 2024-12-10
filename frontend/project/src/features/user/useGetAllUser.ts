import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { callGetAllUser } from "../../config/api"
import { IBackendResponse, IUser } from "../../types/backend";
import { AxiosError } from "axios";

export const useGetAllUser = () => {
  const { data, isPending } = useQuery<IBackendResponse<IUser[]>, AxiosError<IBackendResponse<any>>>({
    queryKey: ['users'],
    queryFn: async (): Promise<any> => callGetAllUser(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}