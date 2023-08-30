<script setup>
import Confirmation from "../components/Confirmation.vue";
import { useStore } from "@/composables/useStore";
const { content } = useStore();
import { ref } from "vue";

defineProps({
  info: Object,
});

const editInfos = ref(false);
const confirmation = ref(false);
const action = ref("");

defineEmits(["close-modal", "delete-item", "update-item"]);

const imgRef = ref("");
function handleDefineImg(event) {
  imgRef.value = event.target.files[0];
}
</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <div class="content w-75 bg-white pa-2">
      <div class="d-flex align-center justify-space-between">
        <div>
          <v-btn
            v-if="!editInfos"
            class="mx-2"
            icon="mdi-pencil"
            @click="editInfos = true"
            :loading="content.items.loading"
          ></v-btn>

          <v-btn
            v-if="!editInfos"
            class="mx-2"
            icon="mdi-trash-can-outline"
            :loading="content.items.loading"
            @click="
              confirmation = true;
              action = 'delete';
            "
          ></v-btn>

          <v-btn
            v-if="editInfos"
            @click="
              confirmation = true;
              action = 'edit';
            "
            class="mx-2"
            icon="mdi-content-save-alert"
          ></v-btn>

          <v-btn
            v-if="editInfos"
            @click="editInfos = false"
            class="mx-2"
            icon="mdi-content-save-off-outline"
          ></v-btn>
        </div>

        <v-card
          class="elevation-0 d-flex align-center justify-center flex-column bg-transparent"
        >
          <v-card-title
            v-if="!editInfos"
            class="d-flex align-center flex-column"
          >
            <h2>{{ info.data.nome }}</h2>
            <v-card-subtitle> ID: {{ info.id }}</v-card-subtitle>
            <v-card-subtitle
              >Criador: {{ info.data.criador }}
              <span v-if="info.data.editor"
                >| Ultimo editor: {{ info.data.editor }}
              </span>
            </v-card-subtitle>
          </v-card-title>
          <v-card v-if="editInfos" width="500px" height="50px" lass="bg-red">
            <v-text-field
              v-model="info.data.nome"
              label="Titulo"
              :readonly="!editInfos"
              variant="solo"
            ></v-text-field>
          </v-card>

          <v-card-subtitle>{{ info.data.id }}</v-card-subtitle>
        </v-card>

        <div>
          <v-btn icon="mdi-window-close" @click="$emit('close-modal')"></v-btn>
        </div>
      </div>

      <v-divider class="ma-4"></v-divider>

      <div>
        <v-row class="ma-0">
          <v-col cols="6" class="d-flex justify-center">
            <v-img
              v-if="!editInfos"
              max-height="500px"
              :src="info.url[0]"
            ></v-img>
            <div>
              <v-img
                v-if="editInfos"
                max-height="500px"
                :src="info.url[0]"
              ></v-img>
              <v-text-field
                v-if="editInfos"
                type="file"
                :rules="notEmptyRule"
                :onchange="handleDefineImg"
              ></v-text-field>
            </div>
          </v-col>
          <v-col style="height: 600px" class="overflow-auto pa-5" cols="6">
            <h3>Informações Técnicas</h3>
            <v-row>
              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.altura"
                  v-model="info.data.altura"
                  label="Altura"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos && !info.data.comp"
                  v-model="info.data.comp"
                  label="Comprimento"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.larg"
                  v-model="info.data.larg"
                  label="Largura"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos && !info.data.material"
                  v-model="info.data.material"
                  label="Material"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>Informações Comerciais</h3>

            <v-row>
              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.fornecedor"
                  v-model="info.data.fornecedor"
                  label="Fornecedor"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.preco"
                  v-model="info.data.preco"
                  label="Valor"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>Informações Gerais</h3>
            <v-row>
              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.finalidade"
                  v-model="info.data.finalidade"
                  label="Finalidade"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos && !info.data.tipo"
                  v-model="info.data.tipo"
                  label="Tipo"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :disabled="!editInfos && !info.data.evento"
                  v-model="info.data.evento"
                  label="Evento"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos && !info.data.dataCompra"
                  type="date"
                  v-model="info.data.dataCompra"
                  label="Data de Compra"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>Descrição</h3>
            <v-textarea
              auto-grow
              :disabled="!editInfos && !info.data.descrição"
              v-model="info.data.descrição"
              label="Descrição"
              :readonly="!editInfos"
              variant="underlined"
              rows="1"
            ></v-textarea>
          </v-col>
        </v-row>
      </div>

      <v-alert
        class="pa-0"
        type="warning"
        title="Cuidado..."
        text="Modo de edição ativo!"
        v-if="editInfos"
      >
      </v-alert>

      <Confirmation
        @close="confirmation = false"
        @delete-item="
          $emit('delete-item', info.id);
          confirmation = false;
        "
        @update-item="
          $emit('update-item', info, imgRef);
          editInfos = false;
          confirmation = false;
        "
        :modal="confirmation"
        :item="info.data.nome"
        :action="action"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
}

.custom-scroll {
  width: 600px;
  height: 150px;
  overflow-y: auto;
}
</style>
