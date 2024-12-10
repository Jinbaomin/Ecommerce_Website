import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IBackendResponse, ICategory } from "../../types/backend";
import { AxiosError } from "axios";
import { callGetAllCategory, callGetCategoryById } from "../../config/api";

export const useGetCategoryById = () => {
  const categoryId = window.location.pathname.split('/')[3];

  const { data, isPending, isFetching } = useQuery<IBackendResponse<ICategory>, AxiosError<any>>({
    queryKey: ['category', categoryId],
    queryFn: async (): Promise<any> => callGetCategoryById(categoryId),
    staleTime: Infinity,
    placeholderData: keepPreviousData
  });

  return { data, isPending, isFetching };
}