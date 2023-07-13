import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const auth = getAuth();

export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    return err.code;
  }
};

export const signUp = async (email, password) => {
<<<<<<< HEAD
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (err) {
    return err.code;
  }
};
=======
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const Logout = async () =>
  signOut(auth).then(() => {
    alert("You have been signed out");
  });

export const activeUser = async () =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/home");
      return;
    } else {
      router.push("/");

      return false;
    }
  });
>>>>>>> 4b81218b97637ab295ecb2094e186ab862057f3a
