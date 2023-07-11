<template>
  <div>
    <v-text-field
      variant="underlined"
      v-model="email"
      label="Digite seu e-mail"
    ></v-text-field>
    <v-text-field
      variant="underlined"
      v-model="password"
      :type="passwordFieldType"
      label="Sua senha"
      append-icon="mdi-eye"
      @click:append="togglePasswordVisibility"
    ></v-text-field>
    <v-text-field
      variant="underlined"
      v-model="confirmPassword"
      :type="passwordFieldType"
      label="Confirme sua senha"
      append-icon="mdi-eye"
      @click:append="togglePasswordVisibility"
    ></v-text-field>
    <v-btn
      variant="tonal"
      type="submit"
      size="large"
      block
      class="mt-2"
      :disabled="!isPasswordConfirmed"
      @submit="handleSignUp"
    >Cadastre-se</v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordFieldType = ref("password");

const isPasswordConfirmed = computed(() => {
  return password.value === confirmPassword.value;
});

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
};

const handleSignUp = async () => {
  const res = await auth.signUp(email.value, password.value);
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};
</script>



