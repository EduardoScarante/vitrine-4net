<script setup>
import logo4net from "@/assets/logo-branca-4net.png";
import bg from "@/assets/bg.png";

/* COMPONENTES */
import itemBox from "../components/itemBox.vue";
import detailModal from "../components/detailModal.vue";
import Loader from "../components/loader.vue";
import createItem from "../components/createItem.vue";

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

function redirect() {
  content.auth.Logout();
  router.push("/");
}

function handleDetailItem(info) {
  detailedItem.value = info;
  modalDetailedItem.value = true;
}

/* MODAL DE CRIAÇÂO DE ITENS */
const modalCreateItem = ref(false)

async function handleCreateItem(payload, imgpayload) {
console.log(payload, imgpayload);
/*   const res = await content.items.createItem(payload, imgpayload);
  if (res) alert("criado com sucesso!");
  modalCreateItem.value = false
  content.items.getItems() */
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
const selectedFilter = ref("Nome");
const listFilter = ref(["ID", "Nome", "Fornecedor", "Evento"]);

const filteredItens = computed(() => {
  const itens = content.items.dbItems;

  if (!nameFilter.value) return itens;
  if (selectedFilter.value == "ID") return itens.filter(el => el.id.includes(nameFilter.value))

  return itens.filter((el) =>
    el.data[selectedFilter.value.toLowerCase()]
    .toLowerCase()
    .includes(nameFilter.value.toLocaleLowerCase())
  );
});
</script>

<template>

  <div class="blueBg d-flex flex-column">
    <v-img :src="logo4net"></v-img>
    <p class="text-white title-page">VITRINE VIRTUAL 4NETWORK</p>
  </div>

<v-btn @click="redirect()" />

  <div v-if="loading"  class="loading-container">
    <Loader></Loader>
  </div>


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
          :items="listFilter"
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
        @click="modalCreateItem = true"
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

    <!-- MODAL CREATE -->
    <createItem v-if="modalCreateItem" @create-item="handleCreateItem"></createItem>
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

  background: linear-gradient(
    144deg,
    rgba(0, 49, 95, 1) 22%,
    rgb(0, 24, 46) 83%
  );
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
