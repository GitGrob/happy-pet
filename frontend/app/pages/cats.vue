<template>
  <DataView :value="cats" layout="grid">
    <template #grid>
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="(item, i) in cats"
          :key="i"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
        >
          <div
            class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
          >
            <div class="bg-surface-50 flex justify-center rounded p-4">
              <div class="relative mx-auto">
                <img
                  class="rounded w-full"
                  :alt="item.name"
                  style="max-width: 300px"
                />
              </div>
            </div>
            <div class="pt-6">
              <div class="flex flex-row justify-between items-start gap-2">
                <div>
                  <span
                    class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                  >
                    Breed: {{ item.breed }}
                  </span>
                  <div class="text-lg font-medium mt-1">{{ item.color }}</div>
                </div>
                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                  <div
                    class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                    style="
                      border-radius: 30px;
                      box-shadow:
                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                    "
                  >
                    <span class="text-surface-900 font-medium text-sm">{{
                      item.weight
                    }}</span>
                    <i class="pi pi-star-fill text-yellow-500"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
<script lang="ts" setup>
import { type Cat } from '~/type/Cat';
/* -------------------------------------------------------------------------- */
/*                                  VARIABLE                                  */
/* -------------------------------------------------------------------------- */

const cats = ref<Cat[]>([
  {
    id: '1',
    name: 'Cassius',
    breed: 'Trigré',
    dateOfBirth: '2020-05-10',
    color: 'Brown',
    weight: 7.4,
    imageUrl: undefined
  },
  {
    id: '2',
    name: 'Odin',
    breed: 'Trigré',
    dateOfBirth: '2019-05-10',
    color: 'Black & White',
    weight: 3.4,
    imageUrl: undefined
  },
  {
    id: '3',
    name: 'Arwen',
    breed: 'Black',
    dateOfBirth: '2019-05-10',
    color: 'Black',
    weight: 3.4,
    imageUrl: undefined
  }
]);
</script>
