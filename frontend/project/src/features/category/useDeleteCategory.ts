import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBackendResponse, ICategory } from "../../types/backend";
import { AxiosError } from "axios";
import { callCreateCategory, callDeleteCategory, callGetAllCategory, callUpdateCategory } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";
import { useNavigate } from "react-router";

interface IDeleteCategory {
  categoryId: string;
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending, isSuccess } = useMutation<IBackendResponse<any>, AxiosError<any>, IDeleteCategory>({
    mutationFn: async ({ categoryId }): Promise<any> => callDeleteCategory(categoryId),
    onSuccess: (data) => {
      nofitication(data?.message, 'success');
      queryClient.invalidateQueries({
        queryKey: ['allCategory']
      });
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { deleteCategory, isPending, isSuccess };
}