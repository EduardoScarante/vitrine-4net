import { reactive } from "vue";

export const authStore = reactive({
  user: {
    nome: "teste",
  },
  teste(param1, param2) {
    console.log(param1, param2);
  },
});
