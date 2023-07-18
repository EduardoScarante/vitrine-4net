import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref as refFirebase,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../../../../firebase.config";

/* CRIA REGISTRO NO FIRESTORE E NO STORAGE */

export async function createItem(payload, image) {
  const docRef = await addDoc(collection(db, "items"), payload);
  const imageRef = refFirebase(storage, `${docRef.id}/${docRef.id}`);
  await uploadBytes(imageRef, image);
  return docRef;
}

/* BUSCA ITEM NO FIRESTORE */
export async function getItems() {
  const localItems = [];

  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    localItems.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return await Promise.all(
    localItems.map(async (item) => {
      const url = await getImageUrl(item.id);
      return { ...item, url };
    })
  );
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

export async function deleteItem(id) {
  await deleteObject(refFirebase(storage, `${id}/${id}`))
  return await deleteDoc(doc(db, "items", id));
}

/* ATUALIZAR ITENS */

export async function updateItem(info, editor, imgRef) {
  const docRef = doc(db, "items", info.id);
  const payload = {
    ...info.data,
    editor: editor,
  };

  if (imgRef) {
    await deleteObject(refFirebase(storage, `${info.id}/${info.id}`));
    await uploadBytes(
      refFirebase(storage, `${docRef.id}/${docRef.id}`),
      imgRef
    );
  }

  return await updateDoc(docRef, payload);
}
