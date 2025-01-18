<template>
  <div :class="['cart-sidebar', { active: isCartOpen }]">
    <button class="icon-button" style="padding-left: 400px;" @click="toggleCart">
      <span class="material-icons">close</span>
    </button>

    <div v-if="cartItems.length > 0">
      <h2>Sepetiniz</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <!-- Ürün görselini göstermek için images dizisinden ilk resmi al -->
          <img :src="item.images[0]" alt="Product Image" style="width: 100px; height: 150px;" />
          
          <div>{{ item.name }} - {{ item.quantity }} x {{ item.price }} TL</div>
          <button @click="removeFromCart(item.id)">Sil</button>
        </li>
      </ul>
      <button @click="clearCart">Sepeti Temizle</button>
    </div>
    <div v-else>
      <div class="cart-container">
        <button class="icon-button">
          <span class="material-symbols-outlined" style="padding-left: 80px; font-size: 40px">shopping_bag</span>
        </button>
        <h2 style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 25px;">Sepetinde Ürün Yok</h2>
      </div>
      <button 
        class="btn btn-submit" 
        @click="navigateToAllProduct"
      >
        <div style="font-family: Open Sans Condensed, sans-serif; font-size: 12px;">ALIŞVERİŞE BAŞLA</div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items); // Sepet ürünlerini al


const isCartOpen = computed(() => cartStore.isCartOpen); // Sepet durumu

const toggleCart = () => {
  cartStore.toggleCart(); // Sepet durumunu toggle et
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId); // Ürün silme
};

const clearCart = () => {
  cartStore.clearCart(); // Sepeti temizleme
};

const navigateToAllProduct = () => {
  router.push('/allProduct'); // Tüm ürünler sayfasına yönlendirme
};
</script>



  <style scoped>
  /* Cart Sidebar Styles */
  .cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 20px;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .cart-sidebar.active {
    transform: translateX(0);
  }
  
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
  }
  
  .cart-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .btn-submit {
    background-color: black; 
    color: white;
    padding: 10px;
    margin-right: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 150px;
  }
  
  .btn-submit:hover {
    background-color: #333;
  }
  </style>
  