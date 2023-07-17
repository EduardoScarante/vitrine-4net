import router from "@/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

const auth = getAuth();

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    return err.code;
  }
};

export const signUp = async (email, password, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userupdate = await updateProfile(user, {
      displayName: name
    })
    console.log(userupdate);
    return user;
  } catch (err) {
    return err.code;
  }
};
export const Logout = async () =>
  signOut(auth).then(() => {
    alert("You have been signed out");
  });

export const activeUser = async (setUser) =>
   onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      router.push("/home");
      return user;
    } else {
      router.push("/");
      return false;
    }
  });
