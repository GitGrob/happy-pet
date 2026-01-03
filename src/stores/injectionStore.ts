import { defineStore } from 'pinia';
import type { InjectionLogs } from '~/type/DiabetesInjection';
import { computed, ref } from 'vue';
import { ofetch } from 'ofetch';


const API_URL = import.meta.env.VITE_API_URL + '/injections';

export const useInjectionStore = defineStore('injection', () => {
  const logs = ref<InjectionLogs[]>([]);
  const isLoading = ref<boolean>(false);

  const getInjectionLogs = computed((): InjectionLogs[] => logs.value);
  const getLastInjection = computed((): InjectionLogs | null => {
    if (logs.value.length === 0) return null;
    return logs.value[0];
  });

  async function loadInjectionLogs() {
    isLoading.value = true;
    try {
      logs.value = await ofetch(API_URL);
    } catch (error) {
      console.error('Failed to load injection logs:', error);
      logs.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function addInjectionLog(log: Omit<InjectionLogs, 'id'>) {
    try {
      const newLog = await ofetch(API_URL, {
        method: 'POST',
        body: log
      });
      logs.value.unshift(newLog);
    } catch (error) {
      console.error('Failed to add injection log:', error);
    }
  }
  return {
    logs,
    isLoading,
    getInjectionLogs,
    getLastInjection,
    loadInjectionLogs,
    addInjectionLog,
  }
}
)