import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    return userCredential
  })
  .catch((error) => {
    console.log(error);
    alert("deu ruim");
  });
}

