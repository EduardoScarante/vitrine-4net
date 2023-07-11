<script setup>

defineProps({
  info: Object,
  hover: Boolean,
})

</script>


<template>
    <v-card :class="hover ? 'elevation-4' : 'elevation-0'" class="ma-2" color="#F8F8F8" height="300px" width="300px">
      <v-btn @click="this.$emit('openDetail')">info</v-btn>

        {{ info }}
    </v-card>
</template>
