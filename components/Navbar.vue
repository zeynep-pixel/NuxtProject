<template>
  <nav class="navbar">
    <!-- Sol Taraf (Menü ve Ara) -->
    <div class="navbar-left">
      <!-- Menü Butonu -->
      <button class="icon-button" @click="toggleMenu">
        <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
      </button>

      <!-- Ara Butonu -->
      <button class="text-icon-button">
        <span class="material-icons">search</span>
        <span><div>Ara</div></span>
      </button>
    </div>

    <!-- Orta Kısım (Logo) -->
    <div class="navbar-center">
      <img
        src="//toucheprive.com/cdn/shop/files/520x200_logo_260x.png?v=1674131476"
        alt="Logo"
        class="logo"
        @click="navigateToIndex"
      />
    </div>

    <!-- Sağ Taraf (Hesap ve Sepet) -->
    <div class="navbar-right">
      <!-- Hesap Butonu -->
      <button class="icon-button" @click="navigateToLgn">
        <span
          style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 13px;"
        >
          <div>Hesap</div>
        </span>
      </button>

      <!-- Sepet Butonu -->
      <button class="icon-button" @click="toggleCart">
        <span
          style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 13px;"
        >
          Sepet
        </span>
        <span class="material-symbols-outlined">shopping_bag</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Navbar'da pinia store kullanılacak
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '~/stores/menu';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';  // Auth store'ı dahil et

const router = useRouter();
const menuStore = useMenuStore();  // Menu store'ı dahil et
const cartStore = useCartStore();  // Cart store'ı dahil et
const authStore = useAuthStore();  // Auth store'ı dahil et

// Menu ve Cart durumları
const isMenuOpen = computed(() => menuStore.isMenuOpen);
const isCartOpen = computed(() => cartStore.isCartOpen);
const isAuthenticated = computed(() => authStore.isAuthenticated); // Kullanıcı doğrulaması

// Menü açma/kapama
const toggleMenu = () => {
  menuStore.toggleMenu(); // Menü durumu değiştir
};

// Sepet açma/kapama
const toggleCart = () => {
  cartStore.toggleCart(); // Sepet durumu değiştir
};

// Sayfa yönlendirmeleri
const navigateToIndex = () => {
  router.push('/');
};

const navigateToAllProduct = () => {
  router.push('/allProduct');
};

const navigateToLgn = () => {
  if (isAuthenticated.value) {
    router.push('/account');  // Eğer giriş yaptıysa account sayfasına yönlendir
  } else {
    router.push('/lgn');  // Giriş yapmamışsa login sayfasına yönlendir
  }
};
</script>


<style scoped>
/* Navbar styles */
.navbar {
  background-color: #ffffff;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
}

.navbar-left {
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.icon-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
  font-size: 24px;
}

.text-icon-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-family: Open Sans Condensed, sans-serif;
  font-weight: 700;
  font-size: 10px;
}

.navbar-center {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.logo {
  height: 50px;
  object-fit: contain;
}

.navbar-right {
  padding-right: 30px;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* Fullscreen Menu */
.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(239, 235, 235, 0.9);
  display: flex;
  overflow-y: auto; 
  z-index: 999;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.menu-content {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  padding-top: 100px;
  width: 80%;
  max-width: 400px;
}

.menu-content ul {
  list-style: none;
}

.menu-content li {
  margin: 30px 0;
}

.menu-content a {
  text-decoration: none;
  color: #0d0d0d;
  font-weight: 700;
  font-size: 18px;
}

.fullscreen-menu .menu-content a:hover {
  color: #414142;
}


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

.cart-sidebar button {
  
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: #333;
  
  
  
}

/* Overlay Styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Şeffaf gri renk */
  z-index: 999;
}

.cart-container {
  display: flex;             /* Flexbox'u aktif hale getir */
  flex-direction: column;    /* İçeriği dikey olarak yerleştir */
  justify-content: center;   /* Dikeyde ortala */
  align-items: center;       /* Yatayda ortala */
  height: 100%;              /* Yüksekliği %100 yaparak tüm alanı kapla */
  text-align: center;
          /* Yazıyı ortala */
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
  background-color: #333; /* Hover efekti */
}
</style>
