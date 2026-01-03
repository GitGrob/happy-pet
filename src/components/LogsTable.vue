<template>
  <Card> 
    <template #title>
      <div class="flex gap-2">
        <i class="pi pi-server text-xl font-bold" /> 
        <h2>Logs</h2>         
      </div>
    </template>

    <template #subtitle>
      <span class="text-sm text-surface-500 dark:text-surface-300">Recent diabetes entries</span>
</template> 

    <template #content>   <DataTable size="small" :value="injections">
      <Column field="day" header="Day"></Column>
      <Column field="hour" header="Hour"></Column>
      <Column field="unit" header="Unit"></Column>
    </DataTable>
    </template> 
  </Card>  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { DateTime } from 'luxon'
import type { InjectionLogs } from '../type/DiabetesInjection'

type InjectionTable = {
  day: string;
  hour: string;
  unit: number;
}

const props = defineProps<{logs: InjectionLogs[]}>()

const injections = computed<InjectionTable[]>(() => {
  return props.logs.map((log) => {
  const datetime = DateTime.fromISO(log.date)
  return {
    day: datetime.toFormat('D'),
    hour: datetime.toFormat('hh:mm a'),
    unit: log.unit,
  }
})
});
</script>
