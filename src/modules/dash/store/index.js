import { reactive } from "vue";
import { getItems, createItem, deleteItem, updateItem} from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
<<<<<<< HEAD
  dbEvents: [],
  dbClass: [],
  dbYear: [],

  
=======

>>>>>>> 91b3195831ccc903782004dd482573e851c28844
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
  async updateItem(info){
    const res = await updateItem(info)
    return res
  }
});
