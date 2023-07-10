import { reactive } from "vue";
import { signIn, signUp } from "../api"

export const authStore = reactive({
  user: {},
  async signIn(email, password) {
    const res = await signIn(email, password);
    this.user = res;
    return res;
  },
  async signUp(email, password){
    const res = await signUp(email, password)
    this.user = res;
    return res;
  },
   toogleTab(tab) {
    return tab.value === "one" ? "two" : "one";
  }
});
