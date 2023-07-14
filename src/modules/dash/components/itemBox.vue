<script setup>
defineProps({
  info: Object,
  hover: Boolean,
});
</script>

<template>
  <v-card @click="this.$emit('openDetail')" :class="hover ? 'elevation-4' : 'elevation-0'"
    class="ma-2 d-flex flex-column align-center rounded-lg" color="#F8F8F8" height="400px" width="400px">

    <v-card-title>{{ info.data.nome }}</v-card-title>

    <v-img width="95%" :height="200" :src="info.url[0]"></v-img>

    <div class="d-flex flex-column align-center">
      <p class="font-weight-thin">{{ info.data.finalidade }}</p>
      <p class="font-weight-thin">{{ info.data.evento }} | {{ info.data.dataCompra }}</p>
    </div>

  </v-card>
</template>
