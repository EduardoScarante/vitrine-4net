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
    <v-card width="800" height="500" class="d-flex align-center ma-auto bg-white elevation-20 rounded-lg">
      <v-card-text class="pa-0 v-row">
        <v-window v-model="tab">
          <v-window-item value="one">
            <Login />
            <v-btn @click="toggleTab()"> Não tem cadastro?</v-btn>
          </v-window-item>
          <v-window-item value="two">
            <Register />
            <!--             <Register @submit="toggleTab" />
 --> <v-btn cols="auto" variant="plain" size="x-large" @click="toggleTab()"> <v-icon icon="mdi-arrow-left"></v-icon>
            </v-btn>

          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <router-view />
  </v-app>
</template>

<style scoped>
.bg {
  background: linear-gradient(270deg, #72d046, #469ed0);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}</style>
