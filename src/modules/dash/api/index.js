import { collection, getDocs, addDoc} from "firebase/firestore";
import { db } from "../../../../firebase.config";

export async function getItems() {
  const querySnapshot = await getDocs(collection(db, "items"));
  const localItems = []
  querySnapshot.forEach((doc) => {
    localItems.push({
      id: doc.id,
      data: doc.data(),
    })
  });
  return localItems
}

export async function createItem(payload){
  const docRef = await addDoc(collection(db, "items"), payload)
  return docRef
}

