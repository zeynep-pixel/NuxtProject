<template>
    <div>
      <Nuxt />
      <Navbar />
      <div style="padding-top:300px">
      <div v-if="isAuthenticated">
        <!-- Firebase Authentication'dan gelen kullanıcı bilgileri -->
        <h3>Hoş geldiniz, {{ user?.name || user?.email }}</h3>
        <p>Kullanıcı ID: {{ user?.uid }}</p>
  
        <!-- Firestore'dan çekilen kullanıcı bilgileri -->
        <div v-if="userData">
          <h4>Kullanıcı Bilgileri</h4>
          <p>Ad: {{ userData.name }}</p>
          <p>Telefon: {{ userData.phone }}</p>
        </div>
      </div>
  
      <div v-else>
        <p>Lütfen giriş yapınız!</p>
      </div>
  
      
        <button class="btn btn-outline-dark" @click="handleLogout">Çıkış Yap</button>
      </div>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  import { useRouter } from 'vue-router';
  
  const { user, isAuthenticated, getUserData, logout } = useAuth();
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
  /* Gerekli özel stiller */
  </style>
  