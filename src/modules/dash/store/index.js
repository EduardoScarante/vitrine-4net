import { reactive } from "vue";
import { getItems, createItem} from "../api/index.js";

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
  }
});
