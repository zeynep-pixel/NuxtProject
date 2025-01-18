<template>
  <div :class="['cart-sidebar', { active: isCartOpen }]">
    <button class="icon-button" @click="toggleCart" style="margin-left: 400px;">
      <span class="material-icons">close</span>
    </button>

    <div v-if="cartItems.length > 0">
      <h2>SEPET ({{ totalQuantity }})</h2>
      <div v-if="totalPrice > 1500">Ücretsiz Kargo!</div>

      <div class="cart-items-container">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.images[0]" alt="Product Image" class="product-image" />

          <div class="product-info">
            <div class="product-title-price" style="display: flex; justify-content: space-between;">
              <div class="product-title">{{ item.title }}</div>
              <div v-if="item.indirimli > 0" class="product-price">{{ item.indirimli * item.quantity }} TL</div>
              <div v-else class="product-price">{{ item.price * item.quantity }} TL</div>
            </div>
            <div class="product-price">BEDEN: {{ item.size }} </div>

            <div class="quantity-container">
              <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 0" class="quantity-button">-</button>
              <div class="quantity-display">{{ item.quantity }}</div>
              <button @click="increaseQuantity(item.id)" class="quantity-button">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-total">
        <div class="total-price-container">
          <div>ARA TOPLAM:</div>
          <div class="total-price">{{ totalPrice }} TL</div>
        </div>
        <button @click="clearCart" class="btn btn-dark w-100">ALIŞVERİŞİ TAMAMLA</button>
      </div>
    </div>

    <div v-else>
      <div class="cart-container" style="margin-top: 150px;">
        <button class="icon-button">
          <span class="material-symbols-outlined" style="font-size: 40px; margin-left: 200px;">shopping_bag</span>
        </button>
        <h2 style=" margin-left: 80px;">Sepetinizde Ürün Yok</h2>
      </div>

      <button class="btn btn-dark" style="width: 190px; margin-left: 130px; margin-top: 56px;" @click="navigateToAllProduct">
        <div>ALIŞVERİŞE BAŞLA</div>
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
const cartItems = computed(() => cartStore.items);
const isCartOpen = computed(() => cartStore.isCartOpen);
const totalPrice = computed(() => cartStore.totalPrice);
const totalQuantity = computed(() => cartStore.totalQuantity);

const toggleCart = () => {
  cartStore.toggleCart();
};

const increaseQuantity = (productId) => {
  cartStore.updateQuantity(productId, 1);
};

const decreaseQuantity = (productId) => {
  cartStore.updateQuantity(productId, -1);
};

const clearCart = () => {
  cartStore.clearCart();
};

const navigateToAllProduct = () => {
  router.push('/allProduct');
};
</script>

<style scoped>
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

.cart-items-container {
  flex-grow: 1;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  height: 200px;
}

.product-image {
  width: 120px;
  height: 170px;
  object-fit: fit;
}

.product-info {
  flex-grow: 1;
}

.product-title {
  font-weight: bold;
}

.product-price {
  color: #333;
}

.cart-total {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.total-price-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 30px;
}

.total-price {
  text-align: right;
}

.quantity-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
  border: #333;
}

.quantity-button {
  width: 30px;
  height: 30px;
  background-color: #f1f1f1;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

.quantity-display {
  width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
</style>
