<script setup>
defineProps({
  info: Object,
  hover: Boolean,
});
</script>

<template>
  <v-card @click="this.$emit('openDetail')" :class="hover ? 'elevation-4' : 'elevation-0'"
    class="ma-2 d-flex flex-column justify-center align-center" color="#F8F8F8" height="300px" width="300px">
    <v-img :width="175" :height="175" :src="info.url[0]"></v-img>
    <div class="d-flex flex-column">
      <h3>{{ info.data.nome }}</h3>
      <p class="font-weight-thin">{{ info.data.finalidade }}</p>
      <p class="font-weight-thin">{{ info.data.evento }} | {{ info.data.dataCompra }}</p>
    </div>

  </v-card>
</template>
