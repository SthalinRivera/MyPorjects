// stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        isOpen: false,
    }),
    actions: {
        setCartOpen(value: boolean) {
            this.isOpen = value;
        },
        toggleCart() {
            this.isOpen = !this.isOpen;
        },
    },
});