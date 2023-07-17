import { reactive } from "vue";
import { signIn, signUp, Logout, activeUser } from "../api";

export const authStore = reactive({
  user: {},
  async signIn(email, password) {
    const res = await signIn(email, password);
    this.user = res;
    return res;
  },
  async signUp(email, password, nome) {
    const res = await signUp(email, password, nome);

    this.user = res;
    console.log(res);
    return res;
  },

  async Logout() {
    return await Logout();
  },
  async activeUser() {
    return await activeUser((user) => {
      this.user = user;
    });
  },
});
