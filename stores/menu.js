import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isMenuOpen: false, // Menü açık/kapalı durumu
  }),
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Menü durumunu değiştir
    },
  },
});
