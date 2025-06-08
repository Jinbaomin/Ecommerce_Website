import { useMutation } from "@tanstack/react-query"
import { callGetReport } from "../../config/api";
import { nofitication } from "../../helper/notificationHelper";

export const useReport = () => {
  const { mutate: exportReport, isPending } = useMutation({
    mutationFn: async (data: { startDate: string, endDate: string }): Promise<any> => callGetReport(data.startDate, data.endDate),
    onSuccess: () => {
      nofitication('Export report successfully', 'success');
    }
  });

  return { exportReport, isPending };
}