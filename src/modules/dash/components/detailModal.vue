<script setup>
import { ref } from 'vue';

defineProps({
  info: Object,
})

</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <div class="content h-75 w-75 bg-white">
      {{ info }}
      <v-btn @click="this.$emit('close-modal')">Fechar</v-btn>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
}
</style>