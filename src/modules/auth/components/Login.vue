<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { content } = useStore();
const { auth } = content;
const router = useRouter();

const email = ref("");
const password = ref("");

const loading = ref(false);

defineEmits("toggle-tab");

async function handleSignIn() {
  loading.value = true;
  const res = await auth.signIn(email.value, password.value);
  if (!res.uid) {
    loading.value = false;
    alert(res);
    return;
  }

  router.push("/home");
}

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};
const isInvalidInfos = ref(true);

const passwordRules = [
  (value) => {
    if (value) return true;
    return "Não pode ser vazio";
  },
  (value) => {
    if (value.length >= 6) return true;
    return "A senha precisa ter 6 ou mais caracteres";
  },
];
const emailRules = [
  (value) => {
    if (value.includes("@") && value.includes(".")) return true;
    return "Digite um email válido";
  },
];
</script>

<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>
    
    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">

      <p class="d-flex justify-center text-black text-h4 font-weight-bold pb-5">
        Vitrine Virtual 4network
      </p>

      <v-divider class="ma-5"></v-divider>

      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        Bem-vindo(a), de volta!!
      </p>

      <v-form @submit.prevent="handleSignIn" v-model="isInvalidInfos">
        <v-text-field
          autofocus
          variant="underlined"
          v-model="email"
          label="Digite seu e-mail"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          variant="underlined"
          v-model="password"
          label="Sua senha"
          append-icon="mdi-eye"
          @click:append="togglePasswordVisibility"
          :rules="passwordRules"
        ></v-text-field>

        <v-btn
          variant="tonal"
          :disabled="!isInvalidInfos"
          type="submit"
          size="large"
          block
          class="mt-2"
          :loading="loading"
          >Login
        </v-btn>

        <p
          block
          @click="$emit('toggle-tab')"
          class="d-flex mt-10 justify-center text-blue-grey-lighten-2"
          style="cursor: pointer"
        >
          Não tenho cadastro :(
        </p>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>
