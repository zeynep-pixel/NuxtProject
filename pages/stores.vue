<template>
  <div>
    <Navbar />
    <!-- Stores bileşeni Pinia'dan gelen verileri alır -->
    <Stores :stores="stores" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStoresStore } from '~/stores/stores_info'; // Pinia Store
import Stores from '~/components/Stores.vue'; // Stores bileşeni
import Navbar from '~/components/Navbar.vue'; // Navbar bileşeni

// Pinia Store
const storesStore = useStoresStore();
const stores = computed(() => storesStore.stores); // Pinia'daki stores state'ini al

// Sayfa yüklendiğinde mağazaları çek
onMounted(async () => {
  await storesStore.fetchStores();
});
</script>


