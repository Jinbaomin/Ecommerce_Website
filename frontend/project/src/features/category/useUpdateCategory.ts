import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBackendResponse, ICategory } from "../../types/backend";
import { AxiosError } from "axios";
import { callCreateCategory, callGetAllCategory, callUpdateCategory } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";
import { useNavigate } from "react-router";

interface IUpdateCategory {
  categoryId: string;
  categoryName: string;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isPending, isSuccess } = useMutation<IBackendResponse<ICategory>, AxiosError<any>, IUpdateCategory>({
    mutationFn: async ({ categoryId, categoryName }): Promise<any> => callUpdateCategory(categoryId, categoryName),
    onSuccess: (data) => {
      nofitication(data?.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['category', data.data.categoryId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ['allCategory']
      });
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { updateCategory, isPending, isSuccess };
}