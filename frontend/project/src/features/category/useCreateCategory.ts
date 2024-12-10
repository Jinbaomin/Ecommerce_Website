import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBackendResponse, ICategory } from "../../types/backend";
import { AxiosError } from "axios";
import { callCreateCategory, callGetAllCategory } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";
import { useNavigate } from "react-router";

interface ICreateCategory {
  categoryName: string;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createCategory, isPending, isSuccess } = useMutation<IBackendResponse<ICategory>, AxiosError<any>, ICreateCategory>({
    mutationFn: async ({ categoryName }): Promise<any> => callCreateCategory(categoryName),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['allCategory']
      });
      navigate(-1);
      nofitication(data?.message, 'success');
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { createCategory, isPending, isSuccess };
}