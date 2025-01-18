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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import { useAuthStore } from '~/stores/auth';
import { useCartStore } from '~/stores/cart';
import { useMenuStore } from '~/stores/menu'; // Menu store'u dahil ediyoruz

// Store'lar
const authStore = useAuthStore();
const cartStore = useCartStore();
const menuStore = useMenuStore(); // Menu store

// Store'lar ile computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated);
const isMenuOpen = computed(() => menuStore.isMenuOpen); // Menü durumu
const isCartOpen = computed(() => cartStore.isCartOpen); // Sepet durumu

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

.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Tam ekran yüksekliği */
  z-index: 999;
  overflow: hidden; /* Menü dışına taşma olmasın */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* İçeriğin üstten başlaması */
}

.menu-content {
  width: 100%; /* Tüm ekran genişliğini kapla */
  height: 100%; /* Tüm ekran yüksekliğini kapla */
  background-color: rgba(255, 255, 255, 0.8); /* Menü arka planı beyaz */
  padding: 20px;
  box-sizing: border-box; /* Padding, genişliğe dahil */
  overflow-y: auto; /* Kaydırılabilirlik sağlandı */
}

.menu-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-content li {
  margin: 15px 0;
  padding-bottom: 20px;
}

.menu-content a {
  color: #333;
  text-decoration: none;
  font-size: 18px;
}

</style>
