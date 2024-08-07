import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { id: number; name: string; email: string; roleId: number } | null,
  }),
  actions: {
    setUser(user: { id: number; name: string; email: string; roleId: number }) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    getUser() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
