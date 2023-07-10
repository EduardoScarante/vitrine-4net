<script setup>
import { ref } from "vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const tab = ref("one");

function toggleTab() {
  tab.value = tab.value === "one" ? "two" : "one";
}
</script>

<template>
  <v-app class="bg">
    <v-card
      width="1000"
      height="auto"
      class="d-flex align-center ma-auto bg-white elevation-20 rounded-lg"
    >
      <v-card-text class="pa-0">
        <v-window v-model="tab">
          <v-window-item value="one">
            <Login  />
            <v-btn @click="toggleTab()"> Cadastre-se</v-btn>
          </v-window-item>
          <v-window-item value="two">
            <Register/>
            <v-btn @click="toggleTab()"> Faça Login</v-btn>

          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <router-view />
  </v-app>
</template>

<style scoped>
.bg {
  background: linear-gradient(144deg, rgba(254, 254, 254, 1) 25%, #f6ca9b 100%);
}
</style>

