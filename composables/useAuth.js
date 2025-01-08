// composables/useAuth.js
import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNuxtApp } from '#app'; // Nuxt app context for accessing Firebase

export const useAuth = () => {
  const { $auth, $db } = useNuxtApp(); // Access Firebase auth and database
  const user = ref(null);

  onAuthStateChanged($auth, (currentUser) => {
    if (currentUser) {
      console.log('Kullanıcı oturum açtı:', currentUser);
    } else {
      console.log('Kullanıcı oturum kapattı.');
    }
    user.value = currentUser; // Kullanıcıyı güncelle
  });
  

  // Kullanıcı giriş yapma
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      user.value = userCredential.user; // Kullanıcı bilgilerini güncelle
      return user.value;
    } catch (error) {
      console.error('Giriş hatası:', error.message);
      throw error;
    }
  };

  // Kullanıcı kaydı oluşturma
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password);
      user.value = userCredential.user;
      return user.value;
    } catch (error) {
      console.error('Kayıt hatası:', error.message);
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

  const getUserData = async () => {
    if (!user.value) {
      console.warn('Kullanıcı giriş yapmamış!');
      return null;
    }
  
    try {
      // 'users' koleksiyonundan UID ile eşleşen kullanıcıyı al
      const docRef = $db.collection('users').doc(user.value.uid); // 'users' koleksiyonu
      const doc = await docRef.get(); // Belgeyi getir
      if (doc.exists) {
        // Eğer kullanıcı verisi varsa
        return doc.data(); // Kullanıcı verilerini döndür
      } else {
        console.warn('Kullanıcı verisi bulunamadı!');
        return null;
      }
    } catch (error) {
      console.error('Kullanıcı verisi alınırken hata oluştu:', error.message);
      throw error;
    }
  };

  

  return { user, isAuthenticated, login, register, logout, getUserData };
};
