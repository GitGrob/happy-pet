<template>
  <div class="flex flex-col gap-4">
    <Info :cat="cat" />
    <div class="grid grid-cols-2 gap-4">
      <NextInjection />
      <LogsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cat } from '~/type/Cat';

const cat = ref<Cat>({
  id: '1',
  name: 'Minou',
  breed: 'Persan',
  color: '#FF6B6B',
  weight: 4.5,
  imageUrl: undefined,
  dateOfBirth: '2020-05-15'
});


</script>
