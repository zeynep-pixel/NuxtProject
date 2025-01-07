import { ref, onMounted } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access the app context in Nuxt

export const useProducts = () => {
  const products = ref([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context
  const db = getFirestore($firebaseApp); // Initialize Firestore using the Firebase app

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      products.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data); // Log the product data for debugging

        // Ensure currentImageIndex and images are handled correctly
        return {
          ...data,
          currentImageIndex: data.currentImageIndex || 0, // Default to 0 if missing
          images: data.images || [] // Default to empty array if images are missing
        };
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  onMounted(() => {
    fetchProducts();
  });

  return { products };
};
