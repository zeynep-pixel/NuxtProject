<template>
  <div>
    <div v-if="product && product.images && product.images.length > 0" class="row" style="padding: 9%">
      <img :src="product.images[0]" alt="Product Image" style="width: 550px; height: 800px;" />
      <Porductdetail :product="product" @add-to-cart="addToCart" />
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>Product not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Porductdetail from '~/components/Porductdetail.vue';
import { useProductsStore } from '~/stores/products'; // Pinia store import
import { useCartStore } from '~/stores/cart'; // Sepet store'u import
import type { Product } from '~/stores/products'; // `Product` tipini import et
import type { CartItem } from '~/stores/cart'; // `CartItem` tipini import et

const product = ref<Product | null>(null); 
const loading = ref(true); 
const route = useRoute(); 

const productsStore = useProductsStore();
const cartStore = useCartStore();

onMounted(async () => {
  const id = route.params.id as string; 
  console.log("Product ID:", id);
  product.value = await productsStore.fetchProductById(id); 
  loading.value = false; 
});

const addToCart = (product: Product) => {
  const cartItem: CartItem = {
    id: product.id,
    name: product.name || 'Unnamed Product',
    price: product.price || 0,
    quantity: 1, // Varsayılan olarak 1 adet ekliyoruz
  };
  cartStore.addToCart(cartItem);
};
</script>

<style scoped>
/* Buraya sayfa özel stil ekleyebilirsiniz */
</style>
