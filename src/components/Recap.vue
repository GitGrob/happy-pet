<template>

    <Card v-for="info in globalInformations"
        :style="{ 'background-color': getBackgroundColor(info.color), 'background-opacity': 0.8 }">
        <template #title>
            <i :class="[info.icon, 'font-bold border rounded-lg p-2']" style="font-size: 1rem;" />
        </template>
        <template #subtitle>
            <p class="text-black"> {{ info.title }}</p>
        </template>
        <template #content v-if="cat">
            <p :class="['font-bold text-3xl']"> {{ cat[info.property] }} {{ info.unit }}
            </p>
        </template>
        <template #footer v-if="info.footer">
            <p class="text-xs">{{ info.footer }}</p>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue';
import { Cat } from '../type/Cat';

/* -------------------------------------------------------------------------- */
/*                                   STATES                                   */
/* -------------------------------------------------------------------------- */

const props = defineProps<{ cat: Cat }>()

const globalInformations = [
    { title: 'Weight', property: 'weight', unit: 'Kg', icon: 'pi pi-chart-line', footer: 'Last modified: xx-xx-xxxx', color: 'blue' },
    { title: 'Injection Units', property: 'injectionUnits', unit: '', icon: 'pi pi-info', footer: 'Last modified: xx-xx-xxxx', color: 'green' },
    { title: 'Type of insuline', property: 'insulinType', unit: '', icon: 'pi pi-receipt', color: 'orange' },
    { title: 'Food', property: 'food', unit: 'gr', icon: 'pi pi-info', color: 'red' },
]


/* -------------------------------------------------------------------------- */
/*                                   METHODS                                  */
/* -------------------------------------------------------------------------- */

const getBackgroundColor = (color: string) => {
    return {
        'blue': '#E0F2FF',
        'green': '#E6FFFA',
        'orange': '#FFF4E5',
        'red': '#FFEDEE',
    }[color] || '#FFFFFF';
}
</script>