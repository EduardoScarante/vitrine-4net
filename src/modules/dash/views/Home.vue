<script setup>

import logo4net from "@/assets/logo-branca-4net.png"
import bg from "@/assets/bg.png"

/* COMPONENTES */
import itemBox from '../components/itemBox.vue'
import detailModal from '../components/detailModal.vue'

/* STORE */
import { useStore } from "@/composables/useStore";
const { content } = useStore();

/* VUE FUNCTIONS */
import { onMounted, ref } from "vue";

/* ROUTER */
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  console.log(content.items.getItems());
});


/* MODAL DE DETALHE */
const modalDetailedItem = ref(false)
const detailedItem = ref('')

function handleDetailItem(info) {
  this.detailedItem = info
  this.modalDetailedItem = true
}

</script>

<template>
  <div class="blueBg d-flex flex-column">
    <v-img :src="logo4net"></v-img>
    <p class="text-white title-page">VITRINE VIRTUAL 4NETWORK</p>
  </div>

  <v-card class="d-flex align-center justify-center bg-transparent" height='100vh' width='100vw'>
    <v-card class="d-flex w-75 h-75 align-center justify-center elevation-10">

      <v-row class="h-100">
        <v-col class="elevation-5" cols=3>
          <h3>Material</h3>
          <v-checkbox label="Checkbox"></v-checkbox>

        </v-col>
        <v-col cols=9>
          <input type="text" class="w-100" placeholder="filter">

          <v-card class="overflow-auto d-flex flex-wrap justify-center" height="650px">
            <div v-for="item in content.items.dbItems">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <itemBox :hover="isHovering" :info="item" v-bind="props" @openDetail="handleDetailItem(item)"></itemBox>
                </template>
              </v-hover>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>


    <!-- CREATE BUTTON -->
    <div class="create">
      <v-btn @click="router.push('/create')" height="80px" width="80px" class="elevation-0" variant='tonal'
        color="#00315F" style="border-radius: 80px;">
        <span class="material-symbols-outlined">
          add
        </span>
      </v-btn>
    </div>


    <!-- MODAL DETAIL -->
    <detailModal v-if="modalDetailedItem" :info="detailedItem" @close-modal="modalDetailedItem = false"></detailModal>

  </v-card>
</template>

<style scoped>
.blueBg {
  position: fixed;
  top: 0;
  right: 0;
  height: 150px;
  width: 100vw;
  z-index: -1;

  background: linear-gradient(144deg, rgba(0, 49, 95, 1) 22%, rgb(0, 24, 46) 83%);
}

.title-page {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  letter-spacing: 15px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;

}

.create {
  position: fixed;
  bottom: 10px;
}
</style>

