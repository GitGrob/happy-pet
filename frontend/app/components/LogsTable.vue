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

    <template #content>   <DataTable size="small" :value="logs">
      <Column field="day" header="Day"></Column>
      <Column field="hour" header="Hour"></Column>
      <Column field="unit" header="Unit"></Column>
      <Column field="period" header="Period">
        <template #body="slotProps">
          <Tag :value="slotProps.data.period" class="uppercase" />
        </template>
      </Column>
    </DataTable>
    </template> 
  </Card>  
</template>

<script setup lang="ts">
// REPLACE THIS WITH A PROPS
const logs = [
  { day: '2023-01-04', hour: '07:00', unit: '3.5', period: 'AM' },
  { day: '2023-01-03', hour: '07:00', unit: '3.5', period: 'PM' },
  { day: '2023-01-03', hour: '07:00', unit: '3.5', period: 'AM' },
  { day: '2023-01-02', hour: '07:00', unit: '3.5', period: 'PM' },
  { day: '2023-01-02', hour: '07:00', unit: '3.5', period: 'AM' },
  { day: '2023-01-01', hour: '07:00', unit: '3.5', period: 'PM' }
];
</script>
