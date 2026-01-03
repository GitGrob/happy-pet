<template>
  <Navbar />
  <div class="mx-[10vw] lg:mx-[15vw] my-10">
    <div class="flex flex-col gap-4">
      <Info :cat="cat" />
      <div class="grid grid-cols-2 gap-4">
        <NextInjection :logs="logs" />
        <LogsTable :logs="logs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Cat } from './type/Cat'
import Info from './components/Info.vue'
import NextInjection from './components/NextInjection.vue'
import LogsTable from './components/LogsTable.vue'
import Navbar from './components/Navbar.vue'

const cat = ref<Cat>({
  id: '1',
  name: 'Minou',
  breed: 'Persan',
  color: '#FF6B6B',
  weight: 4.5,
  imageUrl: undefined,
  dateOfBirth: '2020-05-15'
});

const logs = [
  { date: '2025-12-15T13:07:04.054', unit: 3.5 },
  { date: '2025-12-15T13:07:04.054', unit: 3.5 },
  { date: '2025-12-15T13:07:04.054', unit: 3.5 },
  { date: '2025-12-15T13:07:04.054', unit: 3.5 },
  { date: '2025-12-15T13:07:04.054', unit: 3.5 },
  { date: '2025-12-15T13:07:04.054', unit: 3.5 }
];
</script>
