import { ref } from 'vue';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { useNuxtApp } from '#app';

export function useFirebaseUpload() {
  const uploadProgress = ref(0);
  const { $storage } = useNuxtApp();
 // Aserción de tipo para asegurar que $storage es de tipo FirebaseStorage
 const storage = $storage as FirebaseStorage;
  const uploadImage = async (file: File) => {
    const fileRef = storageRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  return {
    uploadProgress,
    uploadImage,
  };
}
