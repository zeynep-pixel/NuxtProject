import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);  // Sepetteki ürünler

  // Sepete ürün eklemek
  const addToCart = (product) => {
    const existingProduct = cartItems.value.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;  // Ürün zaten varsa miktarını arttır
    } else {
      cartItems.value.push({ ...product, quantity: 1 });  // Yeni ürün ekle
    }
  };

  // Sepetten ürün çıkarma
  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  // Sepetteki ürün sayısını döndürme
  const getCartItemCount = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  };

  // Sepetteki ürünleri temizleme
  const clearCart = () => {
    cartItems.value = [];
  };

  return { cartItems, addToCart, removeFromCart, getCartItemCount, clearCart };
});
