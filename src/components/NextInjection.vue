<template>
  <Card v-if="logs">
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-heart-fill text-xl font-bold" />
        <h2>Next Injection</h2>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4 mt-4">
        <InputNumber suffix=" ml" id="unit" showButtons buttonLayout="horizontal" v-model="unit"
          :min-fraction-digits="1" :max-fraction-digits="1" placeholder="0.0" :step="0.1"
          :disabled="!isInjectionAllowed">
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <Button type="button" :loading="buttonLoading" :severity="isInjectionAllowed ? '' : 'warn'" raised
          label="New Injection" @click="addNewInjection()" :disabled="!isInjectionAllowed || !unit" />

        <p v-if="!isInjectionAllowed" class="text-center text-orange-600 dark:text-orange-400 mt-1">
          Next injection at {{ nextInjection?.toFormat('hh:mm a') }}
        </p>
        <p v-else class="text-center text-lime-600">You are good to go !</p>
      </div>
    </template>

  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Duration, DateTime } from 'luxon'
import type { InjectionLogs } from '../type/DiabetesInjection'
import { useInjectionStore } from '../stores/injectionStore'
/* Components */
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

/* -------------------------------------------------------------------------- */
/*                                 COMPOSABLES                                */
/* -------------------------------------------------------------------------- */
const injectionStore = useInjectionStore();
const buttonLoading = ref(false);
const { addInjectionLog } = injectionStore;

const props = defineProps<{ logs: InjectionLogs[] }>()
const unit = ref<number | null>(null);


/* -------------------------------------------------------------------------- */
/*                                  COMPUTED                                  */
/* -------------------------------------------------------------------------- */

const isInjectionAllowed = computed(() => {
  const diff = timeBeforeInjection();
  return diff.as('hours') >= 12;
});

const lastInjectionTime = computed(() => {
  if (props.logs.length === 0) return null;
  if (!props.logs[0]) return null;
  return DateTime.fromISO(props.logs[0].date)
});

const nextInjection = computed(() => {
  if (!lastInjectionTime.value) return null;
  return lastInjectionTime.value.plus({ hours: 12 });
});

const timeBeforeInjection = (): Duration => {
  if (!lastInjectionTime.value) return Duration.fromObject({ hours: 0 });
  const currentTime = DateTime.now();
  const diff = currentTime.diff(lastInjectionTime.value, ['hours', 'minutes']);
  return diff;
}


/* -------------------------------------------------------------------------- */
/*                                   METHODS                                  */
/* -------------------------------------------------------------------------- */

const addNewInjection = async () => {
  if (!unit.value) return;
  buttonLoading.value = true;
  try {
    await addInjectionLog({
      date: DateTime.now().toISO(),
      unit: unit.value
    });
  } catch (error) {
    console.error("Error adding injection log:", error);
    // Should display a toast notification here
  } finally {
    buttonLoading.value = false;
    unit.value = null;
  }
};
</script>