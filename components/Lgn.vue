<template>
  <div class="form-container">
   
    <h2 class="form-title">GİRİŞ YAP</h2>

     <!-- Displaying error or success messages -->
     <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
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
      <!-- Keeping the "ÜYE OL" button, but it won't do anything -->
      <button 
        class="btn btn-register" 
        
      >
        ÜYE OL
      </button>
    </div>

    
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");  // For error messages
const successMessage = ref("");  // For success messages

const { login } = useAuth();

const handleLogin = async () => {
  try {
    const user = await login(email.value, password.value);
    successMessage.value = `Giriş başarılı! Hoş geldiniz`;
    errorMessage.value = ""; // Clear error message if login is successful
  } catch (error) {
    // Handling specific error messages
    if (error.message.includes("wrong-password")) {
      errorMessage.value = "Şifre yanlış";
    } else if (error.message.includes("user-not-found")) {
      errorMessage.value = "E-posta bulunamadı";
    } else {
      errorMessage.value = "Hatalı Giriş ";
    }
    successMessage.value = ""; // Clear success message if there's an error
  }
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
