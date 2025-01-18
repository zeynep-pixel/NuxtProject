<template>
  <div>
    
    <div v-if="product" class="row" style="padding: 9%">
      <img :src="product.images[0]" alt="Product Image" style="width: 550px; height: 800px;" />
      <Porductdetail :product="product" @add-to-cart="addToCart" />
      
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>Product not found</p>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Porductdetail from '~/components/Porductdetail.vue';
import { useProductsStore } from '~/stores/products'; // Pinia store import
import { useCartStore } from '~/stores/cart'; // Sepet store'u import
import Accardion from '~/components/Accardion.vue';

const product = ref(null);
const loading = ref(true);
const route = useRoute();

// Pinia store instance
const productsStore = useProductsStore();
const cartStore = useCartStore();

onMounted(async () => {
  const id = route.params.id; // Get the route parameter
  console.log("Product ID:", id);
  product.value = await productsStore.fetchProductById(id); // Fetch product by ID
  loading.value = false; // Set loading to false after fetching
});

const addToCart = (product) => {
  cartStore.addToCart(product); // Sepete ürün ekle
};
</script>



<style scoped>
/* Styles can be added here */
</style>
