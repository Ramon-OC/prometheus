import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_RIGHT });
};

export const notifyError = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_RIGHT });
};
