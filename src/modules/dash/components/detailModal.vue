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
</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <div class="content h-75 w-75 bg-white pa-2">
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
        </div>

        <v-card
          class="elevation-0 d-flex align-center justify-center flex-column bg-transparent"
        >
          <v-card-title v-if="!editInfos">
            <h2>{{ info.data.nome }}</h2>
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
          <v-btn
            icon="mdi-window-close"
            @click="this.$emit('close-modal')"
          ></v-btn>
        </div>
      </div>

      <v-divider class="ma-4"></v-divider>

      <div>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <v-img max-height="500px" :src="info.url[0]"></v-img>
          </v-col>
          <v-col style="height: 600px" class="overflow-auto pa-5" cols="6">
            <h3>Informações Técnicas</h3>
            <v-row>
              <v-col>
                <v-text-field
                  :disabled="!editInfos ? info.data.altura ? false : true : false"
                  v-model="info.data.altura"
                  label="Altura"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos ? info.data.comp ? false : true : false"
                  v-model="info.data.comp"
                  label="Comprimento"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  :disabled="!editInfos ? info.data.larg ? false : true : false"
                  v-model="info.data.larg"
                  label="Largura"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos ? info.data.material ? false : true : false"
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
                  :disabled="!editInfos ? info.data.fornecedor ? false : true : false"
                  v-model="info.data.fornecedor"
                  label="Fornecedor"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :disabled="!editInfos ? info.data.preco ? false : true : false"
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
                  :disabled="!editInfos ? info.data.finalidade ? false : true : false"
                  v-model="info.data.finalidade"
                  label="Finalidade"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos ? info.data.tipo ? false : true : false"
                  v-model="info.data.tipo"
                  label="Tipo"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :disabled="!editInfos ? info.data.evento ? false : true : false"
                  v-model="info.data.evento"
                  label="Evento"
                  :readonly="!editInfos"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :disabled="!editInfos ? info.data.dataCompra ? false : true : false"
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
              :disabled="!editInfos ? info.data.descrição ? false : true : false"
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
        type="warning"
        title="Cuidado..."
        text="Modo de edição ativo!"
        v-if="editInfos"
      >
      </v-alert>

      <Confirmation
        @close="confirmation = false"
        @delete-item="
          this.$emit('delete-item', info.id);
          confirmation = false;
        "
        @update-item="
          this.$emit('update-item', info);
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
