<template>
  <div>
    <All :products="products" @navigate="navigateToProduct" @nextImage="nextImage" @prevImage="prevImage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '~/stores/products';
import All from '~/components/All.vue'; // Adjust path as needed

const productsStore = useProductsStore();
const router = useRouter();
const products = productsStore.products;

// Fetch all products when the page mounts
onMounted(async () => {
  await productsStore.fetchAllProducts();
});

// Navigation handler
const navigateToProduct = (id: string) => {
  router.push(`/product/${id}`);
};

const nextImage = (index: number) => {
  const product = products[index];
  if (product && product.images && product.currentImageIndex! < product.images.length - 1) {
    product.currentImageIndex!++; // Non-null assertion
  } else {
    product.currentImageIndex = 0; // Loop back to the first image
  }
};

const prevImage = (index: number) => {
  const product = products[index];
  if (product && product.images && product.currentImageIndex! > 0) {
    product.currentImageIndex!--;
  } else {
    product.currentImageIndex = product.images!.length - 1; // Loop back to the last image
  }
};

</script>

<style lang="scss" scoped>
/* Add any page-specific styles here */
</style>
