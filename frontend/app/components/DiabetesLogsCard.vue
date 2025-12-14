<template>
  <Card class="shadow-md dark:bg-slate-800 mt-6">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-droplet text-lg"></i>
        <span class="dark:text-white">Historique des Injections Insuline</span>
      </div>
    </template>
    <template #content>
      <div v-if="injections.length === 0" class="text-center py-4">
        <p class="text-gray-600 dark:text-gray-400 text-sm">Aucune injection enregistrée</p>
      </div>
      <div v-else class="space-y-2">
        <div 
          v-for="injection in injections" 
          :key="injection.id"
          class="flex items-center gap-3 py-2 border-b last:border-b-0 dark:border-gray-700"
        >
          <i class="pi pi-check text-blue-600 dark:text-blue-400 text-sm flex-shrink-0"></i>
          <p class="text-xs text-gray-700 dark:text-gray-300 flex-grow">
            <span class="font-semibold">{{ injection.type }}</span> 
            <span class="text-gray-600 dark:text-gray-400">• {{ formatDateTime(injection.date) }} • {{ injection.dosage }}U</span>
          </p>
          <Badge :value="getTimeOfDay(injection.date)" :severity="getTimeOfDaySeverity(injection.date)" class="flex-shrink-0" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import type { DiabetesInjection } from '~/type/DiabetesInjection'

interface Props {
  injections?: DiabetesInjection[]
}

const props = withDefaults(defineProps<Props>(), {
  injections: () => []
})

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' ' + date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTimeOfDay = (dateString: string): string => {
  const date = new Date(dateString)
  const hour = date.getHours()
  
  if (hour >= 6 && hour < 12) return 'Matin'
  if (hour >= 12 && hour < 18) return 'Après-midi'
  return 'Soir'
}

const getTimeOfDaySeverity = (dateString: string): string => {
  const date = new Date(dateString)
  const hour = date.getHours()
  
  if (hour >= 6 && hour < 12) return 'info'
  if (hour >= 12 && hour < 18) return 'warning'
  return 'success'
}
</script>
