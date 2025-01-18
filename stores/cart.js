// ~/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    isCartOpen: false,
    items: [],
  }),
  actions: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    addToCart(item) {
      this.items.push(item);
    },
    removeFromCart(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
    clearCart() {
      this.items = [];
    },
  },
});
