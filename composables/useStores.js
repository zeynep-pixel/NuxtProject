import { ref, onMounted } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access the app context in Nuxt

export const useStores = () => {
  const stores = ref([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context
  const db = getFirestore($firebaseApp); // Initialize Firestore using the Firebase app

  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      stores.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data); // Log the store data for debugging

        // Ensure any required properties are handled
        return {
          ...data,
          // You can add additional processing here if needed
        };
      });
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  onMounted(() => {
    fetchStores();
  });

  return { stores };
};
