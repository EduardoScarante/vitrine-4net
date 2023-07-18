<script setup>
import logo4net from "@/assets/logo-branca-4net.png";

/* VUE FUNCTIONS */
import { onMounted, ref } from "vue";

/* COMPONENTES */
import itemBox from "../components/itemBox.vue";
import detailModal from "../components/detailModal.vue";
import Loader from "../components/loader.vue";
import createItem from "../components/createItem.vue";
import Error from "../components/Error.vue";

/* STORE */
import { useStore } from "@/composables/useStore";
const { content } = useStore();

/* ROUTER */
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();

/* LOADING LOGIC */
const loading = ref(true);

/* START APP */
onMounted(async () => {
  getAll();
});

async function getAll() {
  try {
    await content.items.getItems();
  } catch (error) {
    alert(error);
  } finally {
    content.items.loading = false;
    loading.value = false;
  }
}

/* DETAIL MODAL LOGIC */
const modalDetailedItem = ref(false);
const detailedItem = ref("");

function handleDetailItem(info) {
  detailedItem.value = info;
  modalDetailedItem.value = true;
}

/* LOGOUT */
function redirect() {
  content.auth.Logout();
  router.push("/");
}

/* NEW ITENS MODAL*/
const modalCreateItem = ref(false);

async function handleCreateItem(payload, imgpayload) {
  content.items.loading = true;
  await content.items.createItem(payload, imgpayload);
  openSnackBar("criado");
  getAll();
  modalCreateItem.value = false;
}

/* DELETE ITEM MODAL */

async function deleteItem(id) {
  content.items.loading = true;
  await content.items.deleteItem(id);
  modalDetailedItem.value = false;
  getAll();
  openSnackBar("deletado");
}

/* UPDATE ITEM LOGIC */

async function updateItem(info, imgRef) {
  content.items.loading = true;
  await content.items.updateItem(info, content.auth.user.displayName, imgRef);
  openSnackBar("atualizado");
  getAll();
}

const valueFilter = ref("");
const listFilter = ref(["ID", "Nome", "Fornecedor", "Evento", "Ano"]);
const selectedFilter = ref("Nome");

/* FILTER ITENS */
const filteredItens = computed(() => {
  const itens = content.items.dbItems;

  if (!valueFilter.value) return itens;
  if (selectedFilter.value == "ID")
    return itens.filter((el) => el.id.includes(valueFilter.value));

  if (selectedFilter.value == "Ano")
    return itens.filter((e) => valueFilter.value == e.data.ano);

  return itens.filter((el) =>
    el.data[selectedFilter.value.toLowerCase()]
      .toLowerCase()
      .includes(valueFilter.value.toLocaleLowerCase())
  );
});

/* SNACKBAR LOGIC */
function openSnackBar(actText) {
  text.value = `Item ${actText.toString()} com sucesso!`;
  visible.value = true;
}

const visible = ref(false);
const text = ref("teste");
const timeout = ref(3000);
const color = ref("success");

/* SIDE BAR */
const drawer = ref(false);
</script>

<template>
  <!-- SIDE MENU -->
  <v-card
    v-if="drawer"
    @click="drawer = !drawer"
    class="h-100 w-100"
    color="rgb(0, 0 ,0, 0.5)"
    style="position: fixed; top: 0; z-index: 3"
  ></v-card>
  <v-card style="z-index: 4">
    <v-layout>
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item prepend-icon="mdi-home" @click="drawer = !drawer"
            >Home</v-list-item
          >
          <v-list-item
            prepend-icon="mdi-forum"
            title="Estoque"
            disabled=""
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-heart"
            title="Curtidos"
            disabled=""
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn
              block
              class="elevation-0"
              color="red-lighten-4"
              @click="redirect"
            >
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>

  <v-btn
    v-if="!loading"
    class="white logoutBtn ma-4"
    @click="drawer = !drawer"
    icon="mdi-menu"
  ></v-btn>

  <!-- HEADER -->
  <div class="blueBg d-flex flex-column">
    <v-img :src="logo4net"></v-img>
    <p class="text-white title-page">VITRINE VIRTUAL 4NETWORK</p>
  </div>

  <!-- CONTAINER -->

  <v-card
    class="d-flex align-center justify-center bg-transparent"
    height="100vh"
    width="100vw"
  >
    <v-card
      class="pa-4 d-flex flex-column w-75 align-center justify-center elevation-10"
      height="700px"
    >
      <h2 class="my-2">Olá {{ content.auth.user.displayName }}!</h2>

      <v-card class="d-flex align-center w-100 elevation-0">
        <v-select
          class="ma-2 w-25"
          v-model="selectedFilter"
          label="Filtro"
          :items="listFilter"
          variant="underlined"
        />

        <v-text-field
          variant="underlined"
          label="Filtro"
          class="w-75 ma-2"
          v-model="valueFilter"
        >
        </v-text-field>
      </v-card>

      <v-card
        class="overflow-auto d-flex flex-wrap justify-center elevation-0"
        height="600px"
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

    <!-- LOADING  -->
    <div v-if="loading" class="loading-container">
      <Loader></Loader>
    </div>

    <!-- CREATE BUTTON -->
    <div class="create">
      <v-btn
        :loading="content.items.loading"
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
      :loading="content.items.loading"
    ></detailModal>

    <!-- MODAL CREATE -->
    <createItem
      v-if="modalCreateItem"
      @create-item="handleCreateItem"
      @close-modal="modalCreateItem = false"
    >
    </createItem>

    <!-- MODAL ERRO -->
    <Error v-if="content.items.errorModal"></Error>

    <!-- SNACKBAR -->
    <v-snackbar v-model="visible" :timeout="timeout" :color="color">
      {{ text }}
    </v-snackbar>
  </v-card>
</template>

<style scoped>
.logoutBtn {
  position: fixed;
  z-index: 2;
  top: 0px;
}

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
  bottom: 5px;
}
</style>
