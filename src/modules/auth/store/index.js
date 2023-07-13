import { reactive } from "vue";
<<<<<<< HEAD
import { signIn, signUp } from "../api";
=======
import { signIn, signUp, Logout, activeUser } from "../api";
>>>>>>> 4b81218b97637ab295ecb2094e186ab862057f3a

export const authStore = reactive({
  async signIn(email, password) {
    return await signIn(email, password);
  },
  async signUp(email, password) {
<<<<<<< HEAD
    return await signUp(email, password);
  },
=======
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
>>>>>>> 4b81218b97637ab295ecb2094e186ab862057f3a
});
