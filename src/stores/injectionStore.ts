import { defineStore } from 'pinia';
import type { InjectionLogs } from '~/type/DiabetesInjection';

const API_URL = 'http://localhost:3001/injections';

export const useInjectionStore = defineStore('injection', {
  state: () => ({
    logs: [] as InjectionLogs[],
    isLoading: false,
  }),

  getters: {
    getInjectionLogs: (state) => state.logs,
    getLastInjection: (state) => {
      if (state.logs.length === 0) return null;
      return state.logs[0];
    },
  },

  actions: {
    async loadInjectionLogs() {
      this.isLoading = true;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch injections');
        const data = await response.json();
        this.logs = data;
      } catch (error) {
        console.error('Failed to load injection logs:', error);
        this.logs = [];
      } finally {
        this.isLoading = false;
      }
    },
    async addInjectionLog(log: Omit<InjectionLogs, 'id'>) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(log),
        });
        if (!response.ok) throw new Error('Failed to add injection');
        const newLog = await response.json();
        this.logs.unshift(newLog);
      } catch (error) {
        console.error('Failed to add injection log:', error);
      }
    },
    async removeInjectionLog(id: number) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete injection');
        this.logs = this.logs.filter((log: any) => log.id !== id);
      } catch (error) {
        console.error('Failed to remove injection log:', error);
      }
    },
  },
});
