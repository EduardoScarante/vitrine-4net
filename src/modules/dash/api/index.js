import { collection, getDocs, addDoc } from "firebase/firestore";
import {
  ref as refFirebase,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../../../../firebase.config";

/* CRIA REGISTRO NO FIRESTORE E NO STORAGE */

export async function createItem(payload, image) {
  const docRef = await addDoc(collection(db, "items"), payload);

  const imageRef = refFirebase(storage, `${docRef.id}/${image.name}`);

  uploadBytes(imageRef, image);

  return docRef;
}

/* BUSCA ITEM NO FIRESTORE */
export async function getItems() {
  const localItems = [];

  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    // const url = getImageUrl(doc.id);
    localItems.push({
      id: doc.id,
      data: doc.data(),
      // url: url,
    });
  });

  return await Promise.all(localItems.map(async item => {
    const url = await getImageUrl(item.id)
    return {...item, url} 
  }))

}

/* BUSCA IMAGEM NO STORAGE */
async function getImageUrl(id) {
  const res = await listAll(refFirebase(storage, `${id}/`));
  return await Promise.all(
    res.items.map(async (item) => {
      return await getDownloadURL(item).then((url) => {
        return url;
      });
    })
  );
}
