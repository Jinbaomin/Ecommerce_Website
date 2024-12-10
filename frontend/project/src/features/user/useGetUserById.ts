import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IBackendResponse, IUser } from "../../types/backend";
import { AxiosError } from "axios";
import { callGetUserById } from "../../config/api";

export const useGetUserById = () => {
  const userId = window.location.pathname.split('/')[3];
  const { data, isPending } = useQuery<IBackendResponse<IUser>, AxiosError<IBackendResponse<any>>>({
    queryKey: ['user', userId],
    queryFn: async (): Promise<any> => callGetUserById(userId),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending };
}