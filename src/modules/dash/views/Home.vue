<script setup>
/* COMPONENTES */
import itemBox from "../components/itemBox.vue";
import detailModal from "../components/detailModal.vue";
import Loader from "../components/loader.vue";

/* STORE */
import { useStore } from "@/composables/useStore";
const { content } = useStore();

/* VUE FUNCTIONS */
import { onMounted, ref } from "vue";

/* ROUTER */
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();

const loading = ref(true);

onMounted(async () => {
  try {
    await content.items.getItems();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

/* MODAL DE DETALHE */
const modalDetailedItem = ref(false);
const detailedItem = ref("");

function handleDetailItem(info) {
  this.detailedItem = info;
  modalDetailedItem.value = true;
}

async function deleteItem(id) {
  const res = await content.items.deleteItem(id);
  content.items.getItems();
  modalDetailedItem.value = false;
  console.log(res);
}

async function updateItem(info) {
  content.items.updateItem(info);
}

const nameFilter = ref("");
const selectedFilter = ref("");

const filteredItens = computed(() => {
  const itens = content.items.dbItems;
  const filteredArray = [];

  if (!nameFilter.value) return content.items.dbItems;

  return itens.filter((el) => el.data[selectedFilter.value].includes(nameFilter.value));
  /*   if (!selectedEvent.value.length == 0)
      if(itens.map(e => e.data.evento).includes(selectedEvent.value)) 
  
    if (!selectedTipo.value.length == 0)
      console.log('marcado');
  
    if (!selectedYear.value.length == 0)
      console.log('marcado'); */

  return content.items.dbItems;
});
</script>

<template>
  <div v-if="loading" class="loading-container">
    <Loader></Loader>
  </div>
  <div class="blueBg"></div>

  <v-card
    class="d-flex align-center justify-center bg-transparent"
    height="100vh"
    width="100vw"
  >
    <v-card
      class="d-flex flex-column w-75 h-75 align-center justify-center elevation-10"
    >
      <v-card class="d-flex align-center w-100">
        <v-select
          class="ma-2 w-25"
          v-model="selectedFilter"
          label="Filtro"
          :items="['nome', 'fornecedor', 'evento']"
        />

        <v-text-field label="Filtro" class="w-75 ma-2" v-model="nameFilter">
        </v-text-field>
      </v-card>

      <v-card
        class="overflow-auto d-flex flex-wrap justify-center"
        height="650px"
      >
        <div v-for="item in filteredItens">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <itemBox
                :hover="isHovering"
                :info="item"
                v-bind="props"
                @openDetail="handleDetailItem(item)"
              ></itemBox>
            </template>
          </v-hover>
        </div>
      </v-card>
    </v-card>

    <!-- CREATE BUTTON -->
    <div class="create">
      <v-btn
        @click="router.push('/create')"
        height="80px"
        width="80px"
        class="elevation-0"
        variant="tonal"
        color="#00315F"
        style="border-radius: 80px"
      >
        <span class="material-symbols-outlined"> add </span>
      </v-btn>
    </div>

    <!-- MODAL DETAIL -->
    <detailModal
      v-if="modalDetailedItem"
      :info="detailedItem"
      @delete-item="deleteItem"
      @update-item="updateItem"
      @close-modal="modalDetailedItem = false"
    ></detailModal>
  </v-card>
</template>

<style scoped>
.blueBg {
  position: fixed;
  top: 0;
  right: 0;
  height: 200px;
  width: 100vw;
  z-index: -1;

  background-color: #00315f;
}

.create {
  position: fixed;
  bottom: 10px;
}
</style>
