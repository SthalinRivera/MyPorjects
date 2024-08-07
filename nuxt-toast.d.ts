// types/nuxt-toast.d.ts
import { Toast } from 'vue3-toastify';

declare module '#app' {
  interface NuxtApp {
    $toast: Toast;
  }
}
