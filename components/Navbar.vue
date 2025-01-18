<template>
  <nav class="navbar">
    <!-- Sol Taraf (Menü ve Ara) -->
    <div class="navbar-left">
      <!-- Menü Butonu -->
      <button class="icon-button" @click="toggleMenu">
        <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
      </button>

      <!-- Ara Butonu -->
      <button class="text-icon-button" @click="toggleSearch">
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

    <!-- Display search results below the search bar -->
    <div v-if="searchResults.length > 0" class="search-results">
      <ul>
        <li v-for="a in searchResults" :key="a.id">
          <a href="#">{{ a.title }}</a>
        </li>
      </ul>
    </div>

    <!-- Display no results message -->
    <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
      <p>No products found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '~/stores/menu';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useProductsStore } from '~/stores/products'; // Products store

// Store'lar
const router = useRouter();
const menuStore = useMenuStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const productsStore = useProductsStore();

const isMenuOpen = computed(() => menuStore.isMenuOpen);
const isCartOpen = computed(() => cartStore.isCartOpen);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const isSearchOpen = ref(false); // Arama durumu
const searchQuery = ref(''); // Arama sorgusu
const searchResults = ref<Product[]>([]); // Arama sonuçları

// Menü açma/kapama
const toggleMenu = (): void => {
  menuStore.toggleMenu();
};

// Sepet açma/kapama
const toggleCart = (): void => {
  cartStore.toggleCart();
};

// Hesap Butonu İşlemi
const navigateToLgn = (): void => {
  if (isAuthenticated.value) {
    router.push('/account'); // Eğer giriş yaptıysa account sayfasına yönlendir
  } else {
    router.push('/lgn'); // Giriş yapmamışsa login sayfasına yönlendir
  }
};

// Ana Sayfaya Gitme
const navigateToIndex = (): void => {
  router.push('/');
};

// Arama işlemi
const searchProducts = async () => {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }
  await productsStore.fetchAllProducts(); // Ürünleri yükle
  searchResults.value = productsStore.products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

// Arama açma/kapama
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  searchQuery.value = ''; // Arama kutusunu sıfırla
  searchResults.value = []; // Arama sonuçlarını sıfırla
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



.search-bar-overlay {
  position: fixed;
  width: 100%;
  height: 100vh; /* Tüm ekran yüksekliği */
  background-color: rgba(255, 255, 255, 0.9); /* Hafif saydam beyaz arka plan */
  display: flex;
  justify-content: flex-start; /* İçeriği üstten başlat */
  align-items: center;
  z-index: 1000;
  flex-direction: column; /* Arama çubuğu ve sonuçlar dikeyde olacak */
}

.search-bar {
  display: flex;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  width: 60%;
  margin-top: 20px; /* Üstten mesafe */
}

.search-bar input {
  flex: 1;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
}

.search-button,
.close-button {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.search-button {
  margin-left: 10px;
}

.close-button {
  margin-left: 10px;
  color: #333;
}

/* Arama sonuçları düzenlemeleri */
.search-results {
  width: 100%; /* Sayfa genişliğini kaplasın */
  padding: 50px;
  box-sizing: border-box; /* Padding dahil olsun */
  background-color: #fff;
 /* Arama çubuğu ile sonuçlar arasında mesafe */
  overflow-y: auto; /* Eğer fazla sonuç olursa kaydırılabilir olsun */
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  margin: 15px 0;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 20px;
}

.search-results a {
  text-decoration: none;
  color: #333;
}

.search-results a:hover {
  color: #414142; /* Hover rengi */
}

/* No results message */
.no-results {
  width: 100%; /* Sayfa genişliğini kaplasın */
  margin-top: 20px;
  text-align: center;
  color: gray;
  font-size: 16px;
}


</style>
