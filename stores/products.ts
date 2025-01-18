import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDocs, getDoc, doc, collection, getFirestore } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // Nuxt uygulama bağlamını kullanmak için
import type { FirebaseApp } from 'firebase/app'; // FirebaseApp türü

// Ürünler için bir TypeScript arayüzü
export interface Product {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  mainPage?: boolean;
  currentImageIndex?: number;
  images?: string[];
  color: string;
  
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]); // Ürünler listesi
  const { $firebaseApp } = useNuxtApp(); // Nuxt bağlamından Firebase uygulamasını alın
  const db = getFirestore($firebaseApp as FirebaseApp); // Firebase Firestore bağlantısı

  // Firestore'dan `mainPage` true olan ürünleri getir
  const fetchProducts = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProductIds = new Set<string>(); // Tekrarlardan kaçınmak için set kullanımı
      const filteredProducts: Product[] = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const product: Product = {
          id: doc.id,
          ...data,
          currentImageIndex: data.currentImageIndex || 0,
          images: data.images || [],
          color: data.color
        };

        // Sadece `mainPage` true olan ürünleri ekle
        if (product.mainPage === true && !fetchedProductIds.has(product.id)) {
          filteredProducts.push(product);
          fetchedProductIds.add(product.id);
        }
      });

      products.value = filteredProducts;
      console.log('Filtered products:', products.value);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Firestore'dan tüm ürünleri getir
  const fetchAllProducts = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const allProducts: Product[] = [];

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const product: Product = {
          id: doc.id,
          ...data,
          currentImageIndex: data.currentImageIndex || 0,
          images: data.images || [],
          color: data.color
        };

        allProducts.push(product); // Tüm ürünleri ekle
      });

      products.value = allProducts;
      console.log('All products:', products.value);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  // Belirli bir ürün ID'sine göre ürünü getir
  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
        } as Product;
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  return { products, fetchProducts, fetchAllProducts, fetchProductById };
});
