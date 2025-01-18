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
import { useProductsStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/stores/products';
import type { CartItem } from '~/stores/cart';

const product = ref<Product | null>(null);
const loading = ref(true);
const route = useRoute();

const productsStore = useProductsStore();
const cartStore = useCartStore();

onMounted(async () => {
  const id = route.params.id as string;
  product.value = await productsStore.fetchProductById(id);
  loading.value = false;
});

const addToCart = (product: Product & { selectedSize: string }) => {
  const cartItemId = `${product.id}-${product.selectedSize}`;
  const existingItem = cartStore.items.find(item => item.id === cartItemId);

  console.log('Sepetteki öğeler:', cartStore.items);  // Sepetteki öğeleri kontrol et
  if (existingItem) {
    console.log('Mevcut ürün bulundu:', existingItem);
    existingItem.quantity++;  // Quantity arttırılıyor
    // Güncellenmiş fiyatı hesapla
    existingItem.price = (product.price ?? 0) * existingItem.quantity; // Use fallback price of 0
  } else {
    console.log('Yeni ürün ekleniyor');
    const cartItem: CartItem = {
      id: cartItemId,
      title: `${product.title}`,
      price: product.price ?? 0,  // Default to 0 if price is undefined
      size: product.selectedSize,
      quantity: 1,  // İlk quantity 1
      images: product.images || [],
      indirimli: (product as any).indirimli ?? 0,
      selectedSize: product.selectedSize,
      color: product.color
    };
    cartStore.addToCart(cartItem);  // Pinia store'a ekle
  }
};


</script>

<style scoped>
/* Buraya sayfa özel stil ekleyebilirsiniz */
</style>
