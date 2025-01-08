import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, doc, getDoc, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access the app context in Nuxt

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context
  const db = getFirestore($firebaseApp); // Initialize Firestore using the Firebase app

  // Ürünleri Firestore'dan al
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      products.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(data); // Log the product data for debugging

        // currentImageIndex ve images'i düzgün şekilde ele al
        return {
          id: doc.id,
          ...data,
          currentImageIndex: data.currentImageIndex || 0, // Eksikse 0 olarak ayarla
          images: data.images || [] // Eksikse boş dizi olarak ayarla
        };
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Ürün ID'sine göre veriyi al
  const fetchProductById = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  return { 
    products, 
    fetchProducts, 
    fetchProductById
  };
});
