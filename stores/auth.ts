// stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, Firestore } from 'firebase/firestore'; // Firestore'ı import ettik
import type { Auth, User } from 'firebase/auth'; // Auth ve User tiplerini type-only import et

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null); // Kullanıcı tipi belirtiliyor
  const errorMessage = ref<string>(''); // Hata mesajı durumu
  const successMessage = ref<string>(''); // Başarı mesajı durumu
  const { $auth, $db } = useNuxtApp(); // Nuxt app context for accessing Firebase  

  // $auth'ı doğru şekilde Auth tipine cast ediyoruz
  const auth = $auth as Auth;
  
  // $db'yi Firestore tipine cast ediyoruz
  const db = $db as Firestore; // Burada Firestore tipini kullanıyoruz

  // Kullanıcı durumu dinle
  onAuthStateChanged(auth, (currentUser: User | null) => {
    user.value = currentUser; // Kullanıcıyı güncelle
  });

  // Kullanıcı giriş yapma
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      successMessage.value = "Giriş başarılı!";
      errorMessage.value = ""; // Hata mesajını temizle
      return user.value;
    } catch (error: any) {
      errorMessage.value = "Giriş hatası: " + error.message;
      successMessage.value = ""; // Başarı mesajını temizle
      throw error;
    }
  };

  // Kullanıcı kaydı oluşturma
  const register = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      successMessage.value = "Kayıt başarılı!";
      errorMessage.value = ""; // Hata mesajını temizle
      return user.value;
    } catch (error: any) {
      errorMessage.value = "Kayıt hatası: " + error.message;
      successMessage.value = ""; // Başarı mesajını temizle
      throw error;
    }
  };

  // Kullanıcı çıkışı
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error: any) {
      console.error('Çıkış hatası:', error.message);
      throw error;
    }
  };

  // Kullanıcının oturum açıp açmadığını kontrol et
  const isAuthenticated = computed<boolean>(() => !!user.value);

  // Firestore'dan kullanıcı verilerini çekme
  const getUserData = async (): Promise<any | null> => {
    if (!user.value) return null;
    const docRef = doc(db, 'users', user.value.uid); // Firestore kullanarak kullanıcı verisini al
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
    getUserData,
  };
});
