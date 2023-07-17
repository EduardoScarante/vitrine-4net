import { reactive } from "vue";
import { getItems, createItem, deleteItem, updateItem} from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
  loading: true,

  async getItems() {
    const res = await getItems();
    this.dbItems = res
  },
  async createItem(payload, image){
    const res = await createItem(payload, image)
    return res
  },
  async deleteItem(id){
    const res = await deleteItem(id)
    return res
  },
  async updateItem(info, editor){
    const res = await updateItem(info, editor)
    return res
  }
});
