import { reactive } from "vue";
import { signIn, signUp } from "../api";

export const authStore = reactive({
  user: {},
  async signIn(email, password) {
    return await signIn(email, password);
  },
  async signUp(email, password) {
    return await signUp(email, password);
  },
});
