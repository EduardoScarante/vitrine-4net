<script setup>
import { ref } from "vue";

defineProps({
  info: Object,
});
</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <div class="content h-75 w-75 bg-white pa-2">
      <div class="d-flex justify-space-between">
        <div>
          <v-btn icon="mdi-pencil" class="mr-2"></v-btn>
          <v-btn icon="mdi-trash-can-outline"></v-btn>
        </div>
        <div><v-btn icon="mdi-window-close"></v-btn></div>
      </div>

      <div class="d-flex">
        <div class="w-50 d-flex custom-border">
          <v-img
            class="custom-border"
            :width="300"
            :height="450"
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/7c/ea/f0/7ceaf0da-d4d3-3426-a95b-c592a2b3f58e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
          ></v-img>
        </div>

        <div class="w-50">{{ info }}</div>
      </div>

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

.custom-border {
  border: 0.5px solid darkgray;
}
</style>
