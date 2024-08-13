// types/nuxt.d.ts
import { FirebaseStorage } from 'firebase/storage';

declare module '#app' {
  interface NuxtApp {
    $storage: FirebaseStorage;
  }
}
