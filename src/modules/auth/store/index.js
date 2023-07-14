import { reactive } from "vue";
import { signIn, signUp, Logout, activeUser } from "../api";

export const authStore = reactive({
  async signIn(email, password) {
    return await signIn(email, password);
  },
  async signUp(email, password) {
    const res = await signUp(email, password);
    this.user = res;
    console.log(res);
    return res;
  },

  async Logout() {
    const res = await Logout();
    this.user = res;
    return res;
  },
  async activeUser() {
    return await activeUser();
  },
});
