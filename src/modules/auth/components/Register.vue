<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">
      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        CADASTRO
      </p>

      <v-form @submit="handleSignUp">
        <Form></Form>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>

<script setup>
import { useStore } from "@/composables/useStore";
import Form from "./RegisterForm.vue";

const { content } = useStore();
const { auth } = content;

const emit = defineEmits(["submit"]);

const handleSignUp = async () => {
  const res = await auth.signUp(email.value, password.value);
  emit("submit");

  email.value = "";
  password.value = "";
};

const user = content.auth.user;
</script>
