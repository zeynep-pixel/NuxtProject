<template>
  <div class="form-container">
    <h2 class="form-title">GİRİŞ YAP</h2>

    <!-- Hata veya başarı mesajlarının görüntülenmesi -->
    <div v-if="auth.errorMessage" class="error-message">
      <p>{{ auth.errorMessage }}</p>
    </div>

    <div v-if="auth.successMessage" class="success-message">
      <p>{{ auth.successMessage }}</p>
    </div>

    <div class="form-group">
      <label for="email">E-posta</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        id="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Şifre</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        id="password"
        required
      />
    </div>

    <div class="button-container">
      <button 
        class="btn btn-submit" 
        @click="handleLogin"
      >
        GİRİŞ YAP
      </button>
      <button 
        class="btn btn-register"
        @click="handleRegister"
      >
        ÜYE OL
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth"; // Pinia store
import { useRouter } from "vue-router"; 

const email = ref("");
const password = ref("");

const auth = useAuthStore(); // Pinia store instance
const router = useRouter(); 

// Giriş yapma işlemi
const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    if (auth.user) {
      router.push("/account"); // Başarılı giriş sonrası yönlendirme
    }
  } catch (error) {
    console.error("Login error:", error.message);
  }
};

// Kayıt olma işlemi
const handleRegister = async () => {
  try {
    await auth.register(email.value, password.value);
    if (auth.user) {
      router.push("/account"); // Başarılı kayıt sonrası yönlendirme
    }
  } catch (error) {
    console.error("Registration error:", error.message);
  }
};
</script>

<style scoped>
/* Stil eklemek isterseniz burada stil tanımlamaları yapabilirsiniz */
</style>


<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  padding: 20px;
  flex-direction: column;
}



.form-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 400px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.password-container {
  position: relative;
}


.password-container input {
  text-align: left; 
  font-size: 13px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-submit {
  background-color: black; 
  color: white;
  width: 100px;
  padding: 10px;
  margin-right: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #333; /* Hover efekti */
}

.btn-register {
  background-color: white; 
  color: black;
  width: 100px; 
  padding: 10px;

  
}


</style>
