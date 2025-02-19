import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning";

export const showToast = (message: string, type: ToastType = "success") => {
  switch (type) {
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
      });
      break;
    case "warning":
      toast.warning(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
      });
      break;
    case "success":
    default:
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "dark",
      });
      break;
  }
};
