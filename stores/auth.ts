export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],  // Sepet öğeleri
    isCartOpen: false,  // Sepet açma kapama durumu
  }),
  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++; // Eğer ürün zaten varsa, quantity'yi artır
      } else {
        this.items.push(item); // Yeni ürün ekle
      }
    },
    removeFromCart(productId: string) {
      this.items = this.items.filter(item => item.id !== productId); // Ürün silme
    },
    clearCart() {
      this.items = [];  // Sepeti temizleme
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;  // Sepeti açma/kapama
    },
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    totalQuantity: (state) => {
      // Sepetteki tüm ürünlerin quantity'sini toplarız
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
