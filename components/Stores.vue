<template>
  <div class="store-list-container">
    <h2 class="text-center mb-4" style="padding-bottom: 50px; padding-top: 30px; font-size: 25px; font-weight: bold;">
      MAĞAZALARIMIZ
    </h2>
    <ul class="list-unstyled">
      <li v-for="store in stores" :key="store.id" class="store-item mb-4">
        <div class="row">
          <i class="bi bi-geo-alt-fill me-3" style="font-size: 1.5rem; color: #000;"></i>
          <div>
            <div class="column">
              <span class="material-symbols-outlined">location_on</span>
            </div>
            <div class="column">
              <h5 class="mb-1 fw-bold">{{ store.name }}</h5>
              <p class="mb-1">{{ store.address }}</p>
              <p class="mb-0">{{ store.phone }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  stores: {
    type: Array,
    required: true,
  },
});
</script>


<style scoped>
.store-list-container {
   
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 150px;
}

.store-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  
}

.store-item:last-child {
  border-bottom: none;
}


</style>