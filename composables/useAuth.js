// composables/useAuth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const useAuth = () => {
  const { $auth } = useNuxtApp();  // Access the provided auth object

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Giriş hatası:", error.message);
      throw error;
    }
  };

  const getUserData = async (userId) => {
    const userRef = doc($db, "users", userId); // 'users' collection
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    return userSnap.data();
  };

  return { login, getUserData };

};
