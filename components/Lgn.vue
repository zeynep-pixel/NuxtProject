<template>
  <div class="form-container">
    <h2 class="form-title">GİRİŞ YAP</h2>

    <!-- Hata veya başarı mesajlarının görüntülenmesi -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
    </div>

    <!-- E-posta ve şifre alanları -->
    <div class="form-group">
      <label for="email">E-posta</label>
      <input
        type="email"
        v-model="localEmail"
        class="form-control"
        id="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Şifre</label>
      <input
        type="password"
        v-model="localPassword"
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
import { defineProps } from "vue";

// Props alımı
const props = defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
  successMessage: {
    type: String,
    default: "",
  },
  onLogin: {
    type: Function,
    required: true,
  },
  onRegister: {
    type: Function,
    required: true,
  },
});

// Yerel e-posta ve şifre verileri
const localEmail = ref("");
const localPassword = ref("");

// Giriş yapma işlemi
const handleLogin = () => {
  props.onLogin(localEmail.value, localPassword.value);
};

// Kayıt olma işlemi
const handleRegister = () => {
  props.onRegister(localEmail.value, localPassword.value);
};
</script>






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
