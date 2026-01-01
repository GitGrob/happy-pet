import { defineStore } from 'pinia';
import type { Cat } from '../../app/type/Cat';

const API_URL = 'http://localhost:3001/cats';

export const useCatStore = defineStore('cat', {
  state: () => ({
    cats: [] as Cat[],
    isLoading: false,
  }),

  getters: {
    getCats: (state) => state.cats,
    getFirstCat: (state) => {
      if (state.cats.length === 0) return null;
      return state.cats[0];
    },
  },

  actions: {
    async loadCats() {
      this.isLoading = true;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch cats');
        const data = await response.json();
        this.cats = data;
      } catch (error) {
        console.error('Failed to load cats:', error);
        this.cats = [];
      } finally {
        this.isLoading = false;
      }
    },
    async addCat(cat: Omit<Cat, 'id'>) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cat),
        });
        if (!response.ok) throw new Error('Failed to add cat');
        const newCat = await response.json();
        this.cats.push(newCat);
      } catch (error) {
        console.error('Failed to add cat:', error);
      }
    },
    async updateCat(id: string, cat: Partial<Cat>) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cat),
        });
        if (!response.ok) throw new Error('Failed to update cat');
        const updatedCat = await response.json();
        const index = this.cats.findIndex(c => c.id === id);
        if (index !== -1) {
          this.cats[index] = updatedCat;
        }
      } catch (error) {
        console.error('Failed to update cat:', error);
      }
    },
    async removeCat(id: string) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete cat');
        this.cats = this.cats.filter(cat => cat.id !== id);
      } catch (error) {
        console.error('Failed to remove cat:', error);
      }
    },
  },
});
