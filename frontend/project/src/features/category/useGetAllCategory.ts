import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IBackendResponse, ICategory } from "../../types/backend";
import { AxiosError } from "axios";
import { callGetAllCategory } from "../../config/api";

export const useGetAllCategory = () => {
  const { data, isPending, isFetching } = useQuery<IBackendResponse<ICategory[]>, AxiosError<any>>({
    queryKey: ['allCategory'],
    queryFn: async (): Promise<any> => callGetAllCategory(),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending, isFetching };
}