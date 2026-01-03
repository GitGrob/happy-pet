<template>
    <Card class="bg-surface-0 ">
        <template #content>
            <div class="flex items-center flex-row">
                <Avatar label="C" size="xlarge"  class="mr-4 h-20 w-20" />
                <div class="flex flex-col item-center gap-2 ">
                    <span class="text-surface-900 dark:text-surface-0 font-bold text-2xl"> {{ cat.name }} </span>
                    <div class="flex items-center flex-wrap gap-6">
                        <div>
                            <span class="text-surface-500 dark:text-surface-300">Age</span>
                            <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold"> {{ calculateAge(cat.dateOfBirth) }} 

                            </div>
                        </div>
                        <div>
                            <span class="text-surface-500 dark:text-surface-300">Color</span>
                            <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold">{{ cat.color }}</div>
                        </div>
                        <div>
                            <span class="text-surface-500 dark:text-surface-300">Breed</span>
                            <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold">{{ cat.breed }}</div>
                        </div>
                        <div>
                            <span class="text-surface-500 dark:text-surface-300">Weight</span>
                            <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold">{{ cat.weight }}</div>
                        </div>
                       
                    </div>
                </div>
            <!-- <div class="mt-6 lg:mt-0 flex items-center gap-4">
                <Button icon="pi pi-bookmark" rounded severity="secondary" />
                <Button icon="pi pi-heart" rounded severity="secondary" />
                <Button icon="pi pi-list" rounded severity="secondary" />
            </div> -->
        </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Avatar, Card } from 'primevue'
import type { Cat } from '../type/Cat'

const props = defineProps<{cat: Cat}>()

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