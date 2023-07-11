<script setup>
defineProps({
  info: Object,
  hover: Boolean,
});
</script>

<template>
  <v-card
    :class="hover ? 'elevation-4' : 'elevation-0'"
    class="ma-2 d-flex flex-column justify-center align-center"
    color="#F8F8F8"
    height="300px"
    width="300px"
  >
    <v-img
      :width="175"
      :height="175"
      src="https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/7c/ea/f0/7ceaf0da-d4d3-3426-a95b-c592a2b3f58e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
    ></v-img>
    <div class="d-flex flex-column">
      <h3>{{ info.data.nome }}</h3>
      <p class="font-weight-thin">{{ info.data.finalidade }}</p>
      <p class="font-weight-thin">{{ info.data.evento }} | {{ info.data.dataCompra }}</p>
    </div>

    <v-btn
      @click="this.$emit('openDetail')"
      variant="text"
      size="medium"
      color="green"
      ><v-icon
        icon="mdi-plus
"
      ></v-icon
    ></v-btn>
  </v-card>
</template>
