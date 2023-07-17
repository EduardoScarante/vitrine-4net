<script setup>
</script>

<template>
 <v-snackbar v-model="visible" :timeout="timeout" :color="color">
    {{ text }}
  </v-snackbar>
  <Snackbar v-if="visible" :text="text" :timeout="timeout" :color="color" />
</template>
