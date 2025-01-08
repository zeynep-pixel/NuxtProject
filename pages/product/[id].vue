<template>
    <div>
      <Navbar />
      <div v-if="product" class="row" style="padding: 9%">
    
        <img :src="product.images[0]" alt="Product Image" style="width: 550px; height: 800px;"/>
       
          <Porductdetail/>
          
       
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
  import { useProducts } from '~/composables/useProducts';
  
  const product = ref(null);
  const loading = ref(true);  // Add a loading state
  const route = useRoute();
  const { fetchProductById } = useProducts();
  
  onMounted(async () => {
    const id = route.params.id; // Rota parametresini alıyoruz
    console.log(id);
    product.value = await fetchProductById(id); // Ürünü ID'ye göre çekiyoruz
    loading.value = false;  // Set loading to false after fetching
  });
  </script>
  
  <style scoped>
  /* Stiller buraya eklenebilir */
  </style>
  