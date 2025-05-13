// types/toast.d.ts
import { Toast } from 'vue3-toastify';

declare module 'vue3-toastify' {
  interface Toast {
    success(message: string, options?: object): void;
    error(message: string, options?: object): void;
    info(message: string, options?: object): void;
    warning(message: string, options?: object): void;
    // Agrega otros métodos que necesites
  }
}