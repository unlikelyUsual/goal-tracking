import toast from "react-hot-toast";
import { TOAST } from "./enums";

export const notifyUser = (msg: string, toastType: TOAST) => {
  switch (toastType) {
    case TOAST.INFO:
    case TOAST.SUCCESS:
      return toast(msg, {
        duration: 3000,
      });

    case TOAST.ERROR:
      return toast.error(msg, {
        duration: 3000,
      });
  }
};
