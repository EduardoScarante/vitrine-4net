<template>
  <v-card class="container d-flex w-100 h-100">
    <v-card class="w-25 ma-auto bg-white elevation-10 rounded-lg flex-column">
      <embed src="https://lottie.host/?file=3999ec6f-ece9-429e-a65e-4510f5f329ca/k2c8qx5SmB.json" class="w-100" style="height: 300px;" type="">
      <v-card-actions>
        <v-btn color="black" block class="w-50" @click="this.$emit('close')">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.2);
}
</style>
