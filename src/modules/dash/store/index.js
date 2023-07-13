import { reactive } from "vue";
import { getItems, createItem, deleteItem, updateItem} from "../api/index.js";

export const itemsStore = reactive({
  defaultImg: 'https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/7c/ea/f0/7ceaf0da-d4d3-3426-a95b-c592a2b3f58e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
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
  async createItem(payload, image){
    const res = await createItem(payload, image)
    this.dbItems.push(res);
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
