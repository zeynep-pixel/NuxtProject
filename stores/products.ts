import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, getDoc, doc, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // To access Nuxt app context
import type { FirebaseApp } from 'firebase/app'; // Import FirebaseApp type

// Define a Product interface
interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  mainPage?: boolean;
  currentImageIndex?: number;
  images?: string[];
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const { $firebaseApp } = useNuxtApp(); // Access Firebase app from Nuxt context

  // Assert $firebaseApp is of type FirebaseApp
  const db = getFirestore($firebaseApp as FirebaseApp); // Cast $firebaseApp to FirebaseApp

  // Fetch products from Firestore where mainPage is true
  const fetchProducts = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProductIds = new Set<string>(); // To avoid duplicates
      const filteredProducts: Product[] = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const product: Product = {
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
  const fetchAllProducts = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts: Product[] = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        const product: Product = {
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
  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data
        } as Product;
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
