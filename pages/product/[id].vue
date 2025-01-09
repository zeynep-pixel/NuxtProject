<template>
  <div>
    <Navbar />
    <div v-if="product" class="row" style="padding: 9%">
      <img :src="product.images[0]" alt="Product Image" style="width: 550px; height: 800px;" />
      <Porductdetail />
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>Product not found</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Porductdetail from '~/components/Porductdetail.vue';
import { useProductsStore } from '~/stores/products'; // Pinia store import

const product = ref(null);
const loading = ref(true);
const route = useRoute();

// Pinia store instance
const productsStore = useProductsStore();

onMounted(async () => {
  const id = route.params.id; // Get the route parameter
  console.log("Product ID:", id);
  product.value = await productsStore.fetchProductById(id); // Fetch product by ID
  loading.value = false; // Set loading to false after fetching
});
</script>

<style scoped>
/* Styles can be added here */
</style>
