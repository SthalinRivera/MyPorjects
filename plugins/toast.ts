// plugins/toast.ts
import Vue3Toastify, { toast, type Content, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Vue3Toastify, {
    autoClose: 2000,
    position: 'bottom-right',
    theme: 'dark'
  } as ToastContainerOptions);

  const customToast = {
    ...toast,
    success: (message: Content) =>
      toast.success(message, {
        icon: "✅",
      }),
    error: (message: Content) =>
      toast.error(message, {
        icon: "❌",
      }),
    info: (message: Content) =>
      toast.info(message, {
        icon: "ℹ️",
      }),
    warning: (message: Content) =>
      toast.warning(message, {
        icon: "⚠️",
      }),
  };

  return {
    provide: {
      toast: customToast,
    },
  };
});