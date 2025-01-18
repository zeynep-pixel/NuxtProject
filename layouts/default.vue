<template>
  <div>
    <!-- Navbar Bileşeni -->
    <Navbar />

    <!-- Sayfa İçeriği -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Tam Ekran Menü -->
    <div class="fullscreen-menu" v-if="isMenuOpen" @click="toggleMenu">
      <div class="menu-content">
        <ul style="padding-top: 80px;">
          <li><a href="#">KOLEKSİYONLAR</a></li>
          <li><a href="#">BÜYÜK TOUCHE İNDİRİMİ</a></li>
          <li><a href="#" @click.prevent="navigateToAllProduct">TÜM ÜRÜNLER</a></li>
          <li><a href="#">SON KALANLAR</a></li>
          <li><a href="#">YENİLER</a></li>
          <li><a href="#">ÇOK SATANLAR</a></li>
          <li><a href="#">TRİKO</a></li>
          <li><a href="#">TAKIM</a></li>
          <li><a href="#">MONT | KABAN</a></li>
          <li><a href="#">KAZAK</a></li>
          <li><a href="#">GÖMLEKK</a></li>
          <li><a href="#">YELEK</a></li>
          <li><a href="#">PANTALON</a></li>
          <li><a href="#">ELBİSE</a></li>
          <li><a href="#">TUNİK</a></li>
        </ul>
      </div>
    </div>

    <!-- Cart Sidebar (Bileşen Olarak Dahil Edildi) -->
    <CartSidebar />

    <!-- Arka Plan (Overlay) -->
    <div v-if="isCartOpen" class="overlay" @click="toggleCart"></div>

    <!-- Arama Barı -->
    <div v-if="isSearchOpen" class="search-bar-overlay">
      <div class="search-bar">
        <input type="text" placeholder="Ara..." v-model="searchQuery" @input="searchProducts" />
        <button class="search-button">
          <span class="material-icons">search</span>
        </button>
        <button class="close-button" @click="toggleSearch">
          <span class="material-icons">close</span>
        </button>
      </div>

      <!-- Arama Sonuçları -->
      <div v-if="searchResults.length > 0" class="search-results">
        <ul>
          <li v-for="a in searchResults" :key="a.id">
            <a href="#" @click.prevent="navigateToProduct(a.id)">{{ a.title }}</a>
          </li>
        </ul>
      </div>

      <!-- Arama Sonucu Yoksa Mesajı -->
      <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
        <p>No products found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import { useAuthStore } from '~/stores/auth';
import { useCartStore } from '~/stores/cart';
import { useMenuStore } from '~/stores/menu'; // Menu store'u dahil ediyoruz
import { useProductsStore } from '~/stores/products'; // Products store

// Store'lar
const authStore = useAuthStore();
const cartStore = useCartStore();
const menuStore = useMenuStore();
const productsStore = useProductsStore(); // Pinia store'dan ürünleri getiriyoruz

// Store'lar ile computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isMenuOpen = computed(() => menuStore.isMenuOpen); // Menü durumu
const isCartOpen = computed(() => cartStore.isCartOpen); // Sepet durumu

// Arama durumu
const isSearchOpen = ref(false); // Arama durumu
const searchQuery = ref(''); // Kullanıcının arama sorgusu
const searchResults = ref<Product[]>([]); // Arama sonuçları

// Menü açma/kapama
const toggleMenu = (): void => {
  menuStore.toggleMenu(); // Menü durumunu toggle ediyoruz
};

// Sepet açma/kapama
const toggleCart = (): void => {
  cartStore.toggleCart(); // Sepet durumunu toggle ediyoruz
};

// Sayfa yönlendirmeleri
const router = useRouter();
const navigateToIndex = (): void => {
  router.push('/');
};

const navigateToAllProduct = (): void => {
  router.push('/allProduct');
};

const navigateToLgn = (): void => {
  if (isAuthenticated.value) {
    router.push('/account'); // Eğer giriş yaptıysa account sayfasına yönlendir
  } else {
    router.push('/lgn'); // Giriş yapmamışsa login sayfasına yönlendir
  }
};

// Product search işlemi
const searchProducts = async () => {
  if (!searchQuery.value) {
    searchResults.value = []; // Reset search results if query is empty
    return;
  }
  await productsStore.fetchAllProducts(); // Ürünleri yükle
  searchResults.value = productsStore.products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

// Navigate to product detail page
const navigateToProduct = (id: string) => {
  router.push(`/product/${id}`); // Navigate to product detail page
};

// Arama açma/kapama
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  searchQuery.value = ''; // Arama kutusunu sıfırla
  searchResults.value = []; // Arama sonuçlarını sıfırla
};
</script>

<style scoped>
/* Genel layout için stil */

/* Ana içerik */
main {
  padding-top: 90px; /* Navbar yüksekliğine göre ayarlanmalı */
  min-height: calc(100vh - 90px); /* Navbar ve Footer arasında alan */
  display: flex;
  flex-direction: column;
}

/* Fullscreen style for search results */
.search-results {
  width: 100%; /* Make the results take up the full width */
  height: calc(100vh - 80px); /* Height minus the search bar */
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* Enable scrolling if necessary */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  margin: 15px 0;
  padding-bottom: 20px;
}

.search-results a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  color: gray;
  font-size: 18px;
}

</style>
