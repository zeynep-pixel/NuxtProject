<template>
  <div>
    <Card2 />
    <Card1 :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductsStore } from '~/stores/products'; // Pinia store import
import type { Product } from '~/stores/products'; // Product türünü import et
import Card1 from '~/components/Card1.vue';
import Card2 from '~/components/Card2.vue';

const products = ref<Product[]>([]); // Product[] türü olarak tanımlandı
const productsStore = useProductsStore(); // Pinia store kullanımı

// Ürünleri sayfa yüklendiğinde çek
onMounted(async () => {
  await productsStore.fetchProducts(); // Pinia'dan ürünleri çek
  products.value = productsStore.products; // Veriyi yerel state'e aktar
});
</script>

<style scoped>
/* Sayfa için özel stil kodları buraya eklenebilir */
</style>


<style scoped>
/* Sayfa için özel stil kodları buraya eklenebilir */
</style>
