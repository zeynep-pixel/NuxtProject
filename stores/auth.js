import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore için gerekli import

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const errorMessage = ref(""); // Hata mesajı durumu
  const successMessage = ref(""); // Başarı mesajı durumu
  const { $auth, $db } = useNuxtApp(); // Nuxt app context for accessing Firebase

  // Kullanıcı durumu dinle
  onAuthStateChanged($auth, (currentUser) => {
    user.value = currentUser; // Kullanıcıyı güncelle
  });

  // Kullanıcı giriş yapma
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      user.value = userCredential.user;
      successMessage.value = "Giriş başarılı!";
      errorMessage.value = ""; // Hata mesajını temizle
      return user.value;
    } catch (error) {
      errorMessage.value = "Giriş hatası: " + error.message; // Hata mesajını ayarla
      successMessage.value = ""; // Başarı mesajını temizle
      throw error;
    }
  };

  // Kullanıcı kaydı oluşturma
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      user.value = userCredential.user;
      successMessage.value = "Kayıt başarılı!";
      errorMessage.value = ""; // Hata mesajını temizle
      return user.value;
    } catch (error) {
      errorMessage.value = "Kayıt hatası: " + error.message; // Hata mesajını ayarla
      successMessage.value = ""; // Başarı mesajını temizle
      throw error;
    }
  };

  // Kullanıcı çıkışı
  const logout = async () => {
    try {
      await signOut($auth);
      user.value = null;
    } catch (error) {
      console.error('Çıkış hatası:', error.message);
      throw error;
    }
  };

  // Kullanıcının oturum açıp açmadığını kontrol et
  const isAuthenticated = computed(() => !!user.value);

  // Firestore'dan kullanıcı verilerini çekme
  const getUserData = async () => {
    if (!user.value) return null; // Eğer kullanıcı yoksa, null döndür
    const docRef = doc($db, 'users', user.value.uid); // 'users' koleksiyonunda user.uid'yi kullanarak veri al
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data(); // Kullanıcı verisini döndür
    } else {
      console.log("No such document!");
      return null;
    }
  };

  return {
    user,
    errorMessage,
    successMessage,
    isAuthenticated,
    login,
    register,
    logout,
    getUserData, // Yeni eklenen fonksiyon
  };
});
