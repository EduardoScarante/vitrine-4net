<script setup>
defineProps({
  info: Object,
  hover: Boolean,
});

defineEmits(["openDetail"])

</script>

<template>
  <v-card @click="$emit('openDetail')" :class="hover ? 'elevation-6 bg-grey-lighten-3' : 'elevation-0'"
    class="ma-2 pa-3 d-flex flex-column align-center rounded-lg" color="#FFF" height="400px" width="400px">

    <v-card-title>{{ info.data.nome }}</v-card-title>

    <v-img width="95%" :height="200" :src="info.url[0]"></v-img>
    
    <div class="d-flex flex-column align-center">
      <p>{{ info.data.finalidade }}</p>
      <p class="font-weight-thin">{{ info.data.evento }} | {{ info.data.dataCompra.split('-').reverse().join("/") }}</p>
    </div>

  </v-card>
</template>
