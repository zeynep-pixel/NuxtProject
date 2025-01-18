import { defineStore } from 'pinia';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  color: string;
  size: string;
  selectedSize: string;
  indirimli?: number; // İndirimli fiyat
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isCartOpen: false,
  }),
  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push(item);
      }
    },
    updateQuantity(productId: string, amount: number) {
      const item = this.items.find(i => i.id === productId);
      if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        // İndirimli fiyat varsa onu kullan, yoksa normal fiyatı kullan
        const effectivePrice = item.indirimli && item.indirimli > 0 ? item.indirimli : item.price;
        return total + (effectivePrice * item.quantity);
      }, 0);
    },
    totalQuantity: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
