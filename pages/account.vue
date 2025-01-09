<template>
  <div>
    <Nuxt />
    <Navbar />
    <div style="padding-top: 300px;">
      <div v-if="isAuthenticated" class="user-info-container">
        <!-- Firestore'dan çekilen kullanıcı bilgileri -->
        <div v-if="userData" class="user-info" style="width:200px">
         
          <p style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 20px;">{{ userData.name }}</p>
          <p style="font-family: Open Sans Condensed, sans-serif; font-weight: 700; font-size: 16px;">{{ userData.address }}</p>
        </div>
        
        <button class="btn btn-outline-dark logout-btn" @click="handleLogout">Çıkış Yap</button>
      </div>
    </div>
  
    <Footer />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth'; // Pinia store import
import { useRouter } from 'vue-router';

const { user, isAuthenticated, getUserData, logout } = useAuthStore(); // Access Pinia store
const router = useRouter();
const userData = ref(null);

// Firestore'dan kullanıcı verilerini çekme
onMounted(async () => {
  if (isAuthenticated) {
    try {
      userData.value = await getUserData();
    } catch (error) {
      console.error('Kullanıcı verileri alınırken hata oluştu:', error.message);
    }
  }
});

// Çıkış yapma işlemi
const handleLogout = async () => {
  try {
    await logout();
    router.push('/'); // Çıkış sonrası anasayfaya yönlendirme
  } catch (error) {
    console.error('Çıkış sırasında bir hata oluştu:', error.message);
  }
};
</script>

<style scoped>
.user-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Butonu sağda tutmak için */
  padding: 20px;
  margin-top: 20px;
}

.user-info {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 14px;
  font-weight: 700;
}

.logout-btn {
  background-color: transparent;
  border-color: darkgray;
  font-weight: 700;
  padding: 8px 15px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: darkgray;
  color: white;
}
</style>
