<template>
  <Navbar />
  <div class="mx-[10vw] lg:mx-[15vw] my-10">
    <div class="flex flex-col gap-4">
      <Info :cat="cat" />
      <div class="grid grid-cols-4 gap-2">
        <Recap :cat="cat" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <NextInjection :logs="logs" />
        <LogsTable :logs="logs" :loading="injectionStore.isLoading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue'
import Info from './components/Info.vue'
import { useCatStore } from './stores/catStore'
import { useInjectionStore } from './stores/injectionStore'
/* components */
import NextInjection from './components/NextInjection.vue'
import LogsTable from './components/LogsTable.vue'
import Navbar from './components/Navbar.vue'
import { InjectionLogs } from './type/DiabetesInjection'
import { Cat } from './type/Cat'
import Recap from './components/Recap.vue'


/* -------------------------------------------------------------------------- */
/*                                 COMPOSABLES                                */
/* -------------------------------------------------------------------------- */
const catStore = useCatStore();
const injectionStore = useInjectionStore();

/* -------------------------------------------------------------------------- */
/*                                  LIFCEYCLE                                 */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  await catStore.loadCats();
  await injectionStore.loadInjectionLogs();
});


/* -------------------------------------------------------------------------- */
/*                                  COMPUTED                                  */
/* -------------------------------------------------------------------------- */
const cat = computed((): Cat => catStore.getFirstCat);
const logs = computed((): InjectionLogs[] => injectionStore.getInjectionLogs);
</script>