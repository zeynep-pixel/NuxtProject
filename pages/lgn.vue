<template>
  <div>
    <!-- Navbar Bileşeni -->
    <Navbar />
    
    <!-- Lgn Bileşeni -->
    <Lgn 
      :onLogin="handleLogin"
      :onRegister="handleRegister"
      :errorMessage="auth.errorMessage"
      :successMessage="auth.successMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'; // Pinia store
import { useRouter } from 'vue-router';
import Lgn from '~/components/Lgn.vue';

// Pinia store instance
const auth = useAuthStore();

// Vue Router instance
const router = useRouter();

// Giriş yapma işlemi
const handleLogin = async (email: string, password: string): Promise<void> => {
  try {
    await auth.login(email, password);
    if (auth.user) {
      router.push('/account'); // Başarılı giriş sonrası yönlendirme
    }
  } catch (error: unknown) {
    // TypeScript error handling
    const errorMessage = (error instanceof Error) ? error.message : 'Giriş sırasında bir hata oluştu.';
    console.error('Login error:', errorMessage);
  }
};

// Kayıt olma işlemi
const handleRegister = async (email: string, password: string): Promise<void> => {
  try {
    await auth.register(email, password);
    if (auth.user) {
      router.push('/account'); // Başarılı kayıt sonrası yönlendirme
    }
  } catch (error: unknown) {
    // TypeScript error handling
    const errorMessage = (error instanceof Error) ? error.message : 'Kayıt sırasında bir hata oluştu.';
    console.error('Registration error:', errorMessage);
  }
};
</script>

<style scoped>

</style>
