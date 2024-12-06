import { useMutation, useQueryClient } from "@tanstack/react-query"
import { callCheckOut } from "../../config/api"
import { IBackendResponse, IOrder } from "../../types/backend";
import { AxiosError } from "axios";
import { nofitication } from "../../helper/notificationHelper";
import { useNavigate } from "react-router";

interface ICheckOut {
  total: number;
  shipTo: string;
  shippingMethod: string;
}

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isPending } = useMutation<IBackendResponse<IOrder>, AxiosError<IBackendResponse<any>>, ICheckOut>({
    mutationFn: async ({ total, shipTo, shippingMethod }): Promise<any> => callCheckOut(total, shipTo, shippingMethod),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['myOrder']
      });

      queryClient.invalidateQueries({
        queryKey: ['myCart']
      });

      queryClient.setQueryData(['detailOrder', data.data.orderId], data.data);

      nofitication(data.message, 'success');

      navigate('/receipt-order/' + data.data.orderId);
    },
    onError: (error) => {
      nofitication(error?.response?.data.message, 'error');
    }
  });

  return { checkout, isPending };
}