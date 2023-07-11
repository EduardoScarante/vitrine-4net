<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";

const { content } = useStore();
const { auth } = content;

const email = ref("");
const password = ref("");

async function handleSignIn() {
  const res = await auth.signIn(email.value, password.value);
  console.log("deu certo")
}

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};
const user = content.auth.user;
</script>

<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">
      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        Bem-vindo(a), de volta!!
      </p>

      <v-form @submit.prevent="handleSignIn">
        <v-text-field
        autofocus
          variant="underlined"
          v-model="email"
          label="Digite seu e-mail"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          v-model="password"
          label="Sua senha"
          append-icon="mdi-eye"
          @click:append="togglePasswordVisibility"
        ></v-text-field>

        <v-btn variant="tonal" type="submit" size="large" block class="mt-2"
          >Login
        </v-btn>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>
