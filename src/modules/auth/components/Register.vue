<script setup>
import { useStore } from "@/composables/useStore";
import { ref, computed } from "vue";

const { content } = useStore();

const nome = ref("");
const email = ref("");
const password = ref("");

const confirmPassword = ref("");
const passwordFieldType = ref("password");
const emit = defineEmits(["toggle-tab"]);

const isInvalidInfos = ref(true);
const loading = ref(false);

/* FUNÇÂO QUE REALIZA O CADASTRO */

async function handleSignUp() {
  loading.value = true;
  const res = await content.auth.signUp(
    email.value,
    password.value,
    nome.value
  );
  if (!res.uid) {
    loading.value = false;
    visible.value = true;
    text.value = "Algo está errado, tente novamente";
    color.value = "warning";
    return;
  }
}

const isPasswordConfirmed = computed(() => {
  return password.value === confirmPassword.value;
});

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};

const rules = [
  (value) => {
    if (value) return true;
    return "Não pode ser vazio";
  },
];
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

/* SNACKBAR LOGIC */

const visible = ref(false);
const text = ref("");
const timeout = ref(3000);
const color = ref("");
</script>

<template>
  <div class="container d-flex">
    <div class="h-100 d-flex justify-center align-center"></div>

    <v-sheet class="mx-auto d-flex flex-column justify-center w-75 px-10">
      <p class="d-flex justify-center text-black text-h5 font-weight-bold pb-5">
        CADASTRO
      </p>

      <v-form v-model="isInvalidInfos" @submit="handleSignUp">
        <div>
          <v-text-field
            :rules="rules"
            variant="underlined"
            v-model="nome"
            label="Digite seu nome"
          ></v-text-field>

          <v-text-field
            :rules="emailRules"
            variant="underlined"
            v-model="email"
            label="exemplo@exemplo.com"
          ></v-text-field>

          <v-text-field
            :rules="passwordRules"
            variant="underlined"
            v-model="password"
            :type="passwordFieldType"
            label="Crie uma senha"
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
            size="large"
            block
            class="mt-2"
            :disabled="!isInvalidInfos || !isPasswordConfirmed"
            @click="handleSignUp"
            >Cadastre-se
          </v-btn>
        </div>

        <p
          block
          @click="$emit('toggle-tab')"
          class="d-flex mt-10 justify-center text-blue-grey-lighten-2"
          style="cursor: pointer"
        >
          Já tenho cadastro! :)
        </p>
      </v-form>
      <v-divider></v-divider>
    </v-sheet>
  </div>

  <v-snackbar v-model="visible" :timeout="timeout" :color="color">
    {{ text }}
  </v-snackbar>
</template>
