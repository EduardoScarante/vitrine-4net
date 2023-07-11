import { reactive } from "vue";
import { getItems, createItem, deleteItem} from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
  async getItems() {
    const res = await getItems();
    this.dbItems = res;
  },
  async createItem(payload){
    const res = await createItem(payload)
    this.dbItems.push(res);
    return res
  },
  async deleteItem(id){
    const res = await deleteItem(id)
    return res
  }
});
