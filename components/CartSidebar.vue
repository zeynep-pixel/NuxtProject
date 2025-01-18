<template>
  <div :class="['cart-sidebar', { active: isCartOpen }]">
    <button class="icon-button" @click="toggleCart" style="margin-left: 400px;">
      <span class="material-icons">close</span>
    </button>

    <div v-if="cartItems.length > 0">
      <h2>SEPET ({{ totalQuantity }})</h2>
      <div v-if="totalPrice > 1500">Ücretsiz Kargo!</div>


      <!-- Kaydırılabilir sepet öğeleri container'ı -->
      <div class="cart-items-container">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.images[0]" alt="Product Image" class="product-image" />

          <div class="product-info">
            <div class="product-title-price" style="display: flex; justify-content: space-between;">
              <div class="product-title">{{ item.title }}</div>
              <div class="product-price">{{ item.price }} TL</div>
            </div>
            <div class="product-price">BEDEN: {{ item.size }} </div>
            <button class="btn btn-dark" @click="removeFromCart(item.id)" style="margin-top: 80px;">Sil</button>
          </div>
        </div>
      </div>

      <!-- Ara toplam ve tamamla butonu sabit altta -->
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
          <span class="material-symbols-outlined" style="font-size: 40px">shopping_bag</span>
        </button>
        <h2>Sepetinizde Ürün Yok</h2>
      </div>

      <button class="btn btn-dark" style="width: 190px; margin-left: 130px;" @click="navigateToAllProduct">
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
const cartItems = computed(() => cartStore.items); // Sepet ürünlerini al
const isCartOpen = computed(() => cartStore.isCartOpen); // Sepet durumu
const totalPrice = computed(() => cartStore.totalPrice); 
const totalQuantity = computed(() => cartStore.totalQuantity);


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
  max-height: 70vh; /* Burada %70 kadar bir yükseklik tanımlandı */
  overflow-y: auto; /* Dikey kaydırma ekler */
  padding-right: 10px;
  margin-bottom: 20px;
 
  
}

.cart-item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  height: 200px; /* Sabit yükseklik */
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
  width: 100%; /* İki öğe arasındaki alanı mümkün olan en geniş şekilde dağıtır */
  padding-bottom: 30px;
}

.total-price {
  text-align: right;
}


</style>
