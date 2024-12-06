import { Flip, toast } from "react-toastify";

export const nofitication = (message: string | undefined, type: string) => {
  if(type == 'success') {
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      theme: 'light',
      transition: Flip
    });
  } else {
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      theme: 'light',
      transition: Flip
    });
  }
}