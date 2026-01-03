
import { defineStore } from 'pinia';
import type { Cat } from '../type/Cat';
import { computed, ref } from 'vue';
import { ofetch } from 'ofetch';

const API_URL = import.meta.env.VITE_API_URL;

export const useCatStore = defineStore('cat', () => {
  const cats = ref<Cat[]>([]);
  const isLoading = ref<boolean>(false);

  const getCats = computed((): Cat[] => cats.value);
  const getFirstCat = computed((): Cat | null => {
    if (cats.value.length === 0) return null;
    return cats.value[0];
  });

  async function loadCats() {
    isLoading.value = true;
    try {
      cats.value = await ofetch(API_URL + '/cats');
    } catch (error) {
      console.error('Failed to load cats:', error);
      cats.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  return {
    cats,
    isLoading,
    getCats,
    getFirstCat,
    loadCats,
  };
});