<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";

const { content } = useStore();
const { auth } = content;

const email = ref("");
const password = ref("");

async function handleSignUp() {
  const res = await auth.signUp(email.value, password.value);
  console.log(res);
}

const user = content.auth.user;
</script>

<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">
      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        Cadastre-se
      </p>

      <v-form @submit.prevent="handleSignUp">
        <v-text-field
          variant="underlined"
          v-model="email"
          label="Digite seu e-mail"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          v-model="password"
          label="Sua senha"
        ></v-text-field>

        <v-btn variant="tonal" type="submit" size="large" block class="mt-2"
          >Login
        </v-btn>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>
