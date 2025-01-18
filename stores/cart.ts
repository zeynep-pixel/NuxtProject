import { defineStore } from 'pinia';

// CartItem tipi
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    isCartOpen: false,
    items: [] as CartItem[], // items dizisi, CartItem tipi ile tanımlandı
  }),
  actions: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    addToCart(item: CartItem) {
      this.items.push(item);
    },
    removeFromCart(itemId: string) {
      this.items = this.items.filter(item => item.id !== itemId);
    },
    clearCart() {
      this.items = [];
    },
  },
});
