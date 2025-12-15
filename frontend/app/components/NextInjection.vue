<template>
  <Card>
    <template #title>
      <div class="flex gap-2">
        <i class="pi pi-heart-fill text-xl font-bold" />
        <h2>Next Injection</h2>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4 mt-4">
          <InputNumber suffix=" ml" id="dose" showButtons buttonLayout="horizontal" v-model="dose" :min-fraction-digits="1"
          :max-fraction-digits="1" placeholder="0.0" :step="0.1" :disabled="!isInjectionAllowed">
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <Button :severity="isInjectionAllowed ? '' : 'warn'" raised label="New Injection" @click="addInjection" :disabled="!isInjectionAllowed || !dose" />
        <p v-if="!isInjectionAllowed" class="text-center text-orange-600 dark:text-orange-400 mt-1">
          Next injection at {{ lastInjectionTime.plus({ hours: 12 }).toFormat('hh:mm a') }}
        </p>
        <p v-else class="text-center text-lime-600">You are good to go !</p>
      </div>
    </template>

  </Card>
</template>

<script setup lang="ts">
import {Duration, DateTime} from 'luxon';
import type { InjectionLogs } from '~/type/DiabetesInjection';


const props = defineProps<{logs: InjectionLogs[]}>()
const dose = ref<number | null>(null);

/* -------------------------------------------------------------------------- */
/*                                  COMPUTED                                  */
/* -------------------------------------------------------------------------- */
const lastInjectionTime = computed(() => {
  if (props.logs.length === 0) return null;
  if (!props.logs[0]) return null;
  return DateTime.fromISO(props.logs[0].date)
});

const timeBeforeInjection = () => {
  if (!lastInjectionTime.value) return Duration.fromObject({ hours: 0 });
  const currentTime = DateTime.now();
  const diff = currentTime.diff(lastInjectionTime.value, ['hours', 'minutes']);
  return diff;
}

const isInjectionAllowed = computed(() => {
  const diff = timeBeforeInjection();
  return diff.as('hours') >= 12;
});

// const addInjection = () => {
//   if (!dose.value || !isInjectionAllowed.value) return;

//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, '0');
//   const day = String(now.getDate()).padStart(2, '0');
//   const hours = String(now.getHours()).padStart(2, '0');
//   const minutes = String(now.getMinutes()).padStart(2, '0');

//   const dateStr = `${year}-${month}-${day}`;
//   const timeStr = `${hours}:${minutes}`;
//   const period = now.getHours() < 12 ? 'AM' : 'PM';

//   logs.value.unshift({
//     day: dateStr,
//     hour: timeStr,
//     unit: dose.value.toString(),
//     period: period
//   });

//   dose.value = null;
// };
</script>