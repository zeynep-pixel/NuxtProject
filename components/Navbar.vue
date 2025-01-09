<template>
  <nav class="navbar">
    <div class="navbar-left">
      <!-- Menu Button with conditional icon -->
      <button class="icon-button" @click="toggleMenu">
        <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
      </button>
      
      <!-- Search Button -->
      <button class="text-icon-button">
        <span class="material-icons">search</span>
        <span><div>Ara</div></span>
      </button>
    </div>

    <!-- Logo (Center) -->
    <div class="navbar-center">
      <img
        src="//toucheprive.com/cdn/shop/files/520x200_logo_260x.png?v=1674131476"
        alt="Logo"
        class="logo"
        @click="navigateToIndex"
      />
    </div>

    <!-- Account and Cart Buttons (Right) -->
    <div class="navbar-right">
      <button class="icon-button" @click="navigateToLgn">
        <span
          style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 13px;"
        >
          <div>Hesap</div>
        </span>
      </button>

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

  <!-- Fullscreen Menu -->
  <div class="fullscreen-menu" v-if="isMenuOpen" @click="toggleMenu">
    <div class="menu-content">
      <ul>
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
        <li><a href="#">GÖMLEK</a></li>
        <li><a href="#">YELEK</a></li>
        <li><a href="#">PANTALON</a></li>
        <li><a href="#">ELBİSE</a></li>
        <li><a href="#">TUNİK</a></li>
      </ul>
    </div>
  </div>

  <!-- Cart Sidebar -->
  <div :class="['cart-sidebar', { active: isCartOpen }]" >
    <button class="icon-button" style="padding-left: 400px;" @click="toggleCart">
        <span class="material-icons">close</span>
      </button>

      <div v-if="cartItems.length > 0">
    <h2>Sepetiniz</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        <div>{{ item.name }} - {{ item.quantity }} x {{ item.price }} TL</div>
        <button @click="removeFromCart(item.id)">Sil</button>
      </li>
    </ul>
    <button @click="clearCart">Sepeti Temizle</button>
    
  </div>
  <div v-else>
    <div class="cart-container">
      
       <div >
      <button class="icon-button" >
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
  </div>

  <!-- Overlay (Arka Plan) -->
  <div v-if="isCartOpen" class="overlay" @click="toggleCart"></div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth'; 
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';

const { isAuthenticated } = useAuthStore(); 

const router = useRouter();

const isMenuOpen = ref(false);
const isCartOpen = ref(false); 

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items); // Sepet ürünlerini al


const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleCart = (event) => {
  event.stopPropagation(); 
  isCartOpen.value = !isCartOpen.value;
};

const navigateToIndex = () => {
  router.push('/');
};

const navigateToAllProduct = () => {
  router.push('/allProduct');
};

const navigateToLgn = () => {
  if (isAuthenticated) {
    router.push('/account');
  } else {
    router.push('/lgn');
  }
};


// Sepetten Ürün Silme Fonksiyonu
const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

// Sepeti Temizleme Fonksiyonu
const clearCart = () => {
  cartStore.clearCart();
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
