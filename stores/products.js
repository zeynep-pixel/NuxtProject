import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, getDoc, doc, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access Nuxt app context

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context
  const db = getFirestore($firebaseApp); // Initialize Firestore using the Firebase app

  // Fetch products from Firestore where mainPage is true
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProductIds = new Set(); // To avoid duplicates
      const filteredProducts = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const product = {
          id: doc.id,
          ...data,
          currentImageIndex: data.currentImageIndex || 0,
          images: data.images || []
        };

        // Only add products where mainPage is true
        if (product.mainPage === true && !fetchedProductIds.has(product.id)) {
          filteredProducts.push(product);
          fetchedProductIds.add(product.id);
        }
      });

      products.value = filteredProducts;
      console.log('Filtered products:', products.value);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all products from Firestore (without mainPage check)
  const fetchAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const product = {
          id: doc.id,
          ...data,
          currentImageIndex: data.currentImageIndex || 0,
          images: data.images || []
        };

        allProducts.push(product); // Add all products without filtering for mainPage
      });

      products.value = allProducts;
      console.log('All products:', products.value);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  // Fetch a specific product by ID from Firestore
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

  return { products, fetchProducts, fetchAllProducts, fetchProductById };
});
