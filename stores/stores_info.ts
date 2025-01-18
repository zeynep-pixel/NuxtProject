import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, collection, getFirestore, Firestore } from 'firebase/firestore';
import { useNuxtApp } from '#app';
import type { FirebaseApp } from 'firebase/app'; // FirebaseApp türünü içe aktarın

type Store = {
  id: string;
  [key: string]: any;
};

export const useStoresStore = defineStore('stores', () => {
  const stores = ref<Store[]>([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context

  // Tip belirtin
  const firebaseApp = $firebaseApp as FirebaseApp; // Explicitly cast to FirebaseApp
  const db: Firestore = getFirestore(firebaseApp); // Initialize Firestore using the Firebase app

  const fetchStores = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      stores.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data); // Log the store data for debugging

        return {
          id: doc.id,
          ...data,
        } as Store;
      });
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  return { stores, fetchStores };
});
