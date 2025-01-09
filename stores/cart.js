import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // Sepetteki ürünler
  }),
  actions: {
   addToCart(product) {
  const existingProduct = this.items.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    this.items.push({ 
      id: product.id, 
      name: product.title, 
      price: product.price, 
      quantity: 1 
    });
  }
}
,
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
});
