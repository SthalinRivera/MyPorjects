// types/toast.d.ts
import { Toast } from 'vue3-toastify';

// Extiende el tipo Toast para incluir el método error
declare module 'vue3-toastify' {
  interface Toast {
    error(message: string, options?: object): void;
  }
}
