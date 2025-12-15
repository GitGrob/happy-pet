<template>
  <div class="p-6">
    <Card class="shadow-md bg-white dark:bg-slate-800 max-h-24">
      <template #content>
        <div class="flex items-center justify-between gap-4 py-1">
          <div class="flex items-center gap-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2"
            >
              <i class="pi pi-heart text-white text-sm"></i>
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-sm dark:text-white truncate">
                {{ cat.name }}
              </h3>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                {{ cat.breed }} • {{ cat.weight }}kg
              </p>
            </div>
          </div>
          <div class="flex gap-3 text-center flex-shrink-0">
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                Couleur
              </p>
              <div class="flex justify-center mt-0.5">
                <div
                  class="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600"
                  :style="{ backgroundColor: cat.color }"
                ></div>
              </div>
            </div>
            <div>
              <p class="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                Âge
              </p>
              <p class="text-xs font-semibold mt-0.5 dark:text-white">
                {{ calculateAge(cat.dateOfBirth) }}a
              </p>
            </div>
          </div>
          <Button
            icon="pi pi-arrow-right"
            class="p-button-rounded p-button-text p-button-sm"
          />
        </div>
      </template>
    </Card>

    <LogsTable />
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

const calculateAge = (dateString: string): number => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
</script>
