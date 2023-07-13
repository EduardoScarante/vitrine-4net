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
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.log(error);
      return errorCode + errorMessage;
    });
};

export const signUp = async (email, password) => {
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
