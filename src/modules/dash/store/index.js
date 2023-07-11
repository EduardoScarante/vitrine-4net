import { reactive } from "vue";
import { getItems, createItem} from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
  async getItems() {
    const res = await getItems();
    this.dbItems = res;
  },
  async createItem(payload, image){
    const res = await createItem(payload, image)
    this.dbItems.push(res);
    return res
  }
});
