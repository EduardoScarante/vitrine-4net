import { reactive } from "vue";
import { getItems, createItem} from "../api/index.js";

export const itemsStore = reactive({
  dbItems: [],
  dbEvents: [],
  dbClass: [],
  dbYear: [],
  
  async getItems() {
    const res = await getItems();
    this.dbItems = res
  
    this.dbEvents = res.reduce((acc, curr) => {
      if(!curr.data.evento || acc.includes(curr.data.evento)) return acc
      acc.push(curr.data.evento)
      return acc
    }, [])

    this.dbClass = res.reduce((acc, curr) => {
      if(!curr.data.tipo || acc.includes(curr.data.tipo)) return acc
      acc.push(curr.data.tipo)
      return acc
    }, [])

    this.dbYear = res.reduce((acc, curr) => {
      const year = curr.data.dataCompra.split("-")[0]
      if(!year || acc.includes(year)) return acc
      acc.push(year)
      return acc
    }, [])
  },
  async createItem(payload){
    const res = await createItem(payload)
    this.dbItems.push(res);
    return res
  }
});
