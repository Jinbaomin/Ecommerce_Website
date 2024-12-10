import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IBackendResponse, IOrder } from "../../types/backend"
import { AxiosError } from "axios"
import { callUpdateStatusOrder } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";

interface IUpdateStatus {
  orderId: string,
  status: string
}

export const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending } = useMutation<IBackendResponse<IOrder>, AxiosError<IBackendResponse<any>>, IUpdateStatus>({
    mutationFn: async ({ orderId, status }): Promise<any> => callUpdateStatusOrder(orderId, status),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['order', data.data.orderId.toString()]
      // });
      queryClient.setQueryData(['order', data.data.orderId.toString()], data);
      queryClient.invalidateQueries({
        queryKey: ['allOrder']
      });
      nofitication(data.message, 'success');
    },
    onError: (error) => {
      nofitication(error.response?.data.message, 'error');
    }
  });

  return { updateStatus, isPending };
}