<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">
      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        CADASTRO
      </p>

      <v-form @submit="handleSignUp">
        <div>
          <v-text-field variant="underlined" v-model="email" label="Digite seu e-mail"></v-text-field>
          
          <v-text-field variant="underlined" v-model="password" :type="passwordFieldType" label="Sua senha"
            append-icon="mdi-eye" @click:append="togglePasswordVisibility"></v-text-field>
          
            <v-text-field variant="underlined" v-model="confirmPassword" :type="passwordFieldType"
            label="Confirme sua senha" append-icon="mdi-eye" @click:append="togglePasswordVisibility"></v-text-field>
          
            <v-btn variant="tonal" size="large" block class="mt-2" :disabled="!isPasswordConfirmed"
            @click="handleSignUp">Cadastre-se</v-btn>
        </div>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>

<script setup>
import { useStore } from "@/composables/useStore";
import { ref, computed } from "vue";

const { content } = useStore();

const email = ref("");
const password = ref("");

const confirmPassword = ref("");
const passwordFieldType = ref("password");


/* FUNÇÂO QUE REALIZA O CADASTRO */
async function handleSignUp() {
  const res = await content.auth.signUp(email.value, password.value);
  console.log(res);
};

const isPasswordConfirmed = computed(() => {
  return password.value === confirmPassword.value;
});

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};
</script>
