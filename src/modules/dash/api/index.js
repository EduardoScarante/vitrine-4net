import { collection, doc, getDocs, addDoc, deleteDoc} from "firebase/firestore";
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

export async function deleteItem(id){
  console.log(id);
  const docRef = await deleteDoc(doc(db, "items", id))
  return docRef
}

