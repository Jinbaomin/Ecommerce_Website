import { useMutation } from "@tanstack/react-query"
import { IBackendResponse, IUser } from "../../types/backend";
import { register as registerApi } from "../../services/apiAuth";
import { AxiosError } from "axios";
import { error } from "console";
import { callRegister } from "../../config/api";

interface RegisterValues {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
}

const useRegister = () => {
  const { mutate: signup, isPending } = useMutation<IBackendResponse<IUser>, AxiosError<IBackendResponse<any>>, RegisterValues>({
    mutationFn: async ({ fullName, userName, email, phone, password }): Promise<any> => callRegister(fullName, userName, email, phone, password),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response?.data.message);
    }
  });

  return { signup, isPending };
}

export default useRegister;