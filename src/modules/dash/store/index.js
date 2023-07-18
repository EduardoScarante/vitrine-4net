import { reactive } from "vue";
import { getItems, createItem, deleteItem, updateItem } from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
  loading: true,
  errorModal: false,

  async getItems() {
    try {
      const res = await getItems();
      this.dbItems = res;
      return;
    } catch (err) {
      this.errorModal = true;
    }
  },
  async createItem(payload, image) {
    try {
      const res = await createItem(payload, image);
      return res;
    } catch (err) {
      this.errorModal = true;
    }
  },
  async deleteItem(id) {
    try {
      const res = await deleteItem(id);
      return res;
    } catch (err) {
      this.errorModal = true;
    }
  },
  async updateItem(info, editor, imgRef) {
    try {
      const res = await updateItem(info, editor, imgRef);
      return res;
    } catch (err) {
      this.errorModal = true;
    }
  },
});
