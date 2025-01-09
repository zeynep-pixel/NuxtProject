import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access the app context in Nuxt

export const useStoresStore = defineStore('stores', () => {
  const stores = ref([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context
  const db = getFirestore($firebaseApp); // Initialize Firestore using the Firebase app

  // Fetch stores from Firestore
  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      stores.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data); // Log the store data for debugging

        // Ensure any required properties are handled
        return {
          id: doc.id, // You may need to include an id property if not already present in the data
          ...data,
        };
      });
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  return { stores, fetchStores };
});
