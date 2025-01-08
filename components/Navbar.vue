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

      <button class="icon-button" >
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
      <!-- Add your menu items here -->
      <ul>
        <li><a href="#">KOLEKSİYONLAR</a></li>
        <li><a href="#">BÜYÜK TOUCHE İNDİRİMİ</a></li>
        <li><a href="#">TÜM ÜRÜNLER</a></li>
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

  
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';


const { isAuthenticated } = useAuth();

const router = useRouter();

// State to toggle menu visibility
const isMenuOpen = ref(false);

// Function to toggle the menu state
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};



const navigateToIndex = () => {
  router.push('/');
};

const navigateToLgn = () => {
  if (isAuthenticated.value) {
    router.push('/account'); // Kullanıcı oturum açtıysa hesap sayfasına yönlendir
  } else {
    router.push('/lgn'); // Oturum açmadıysa giriş yap sayfasına yönlendir
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
  overflow-x: hidden;
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

.material-icons {
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' -25, 'opsz' 24;
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
  font-style: bold;
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
  overflow-y: auto;
}

.fullscreen-menu .menu-content a:hover {
  color: #414142;
}
</style>