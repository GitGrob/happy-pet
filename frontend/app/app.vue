<template>
  <div>
    
<Button label="D" />
<Knob v-model="value" :min="0" max="50" />

  </div>
</template>
<script lang="ts" setup>

const value = 30;
</script>