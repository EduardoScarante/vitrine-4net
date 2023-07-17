<script setup>
import { useStore } from "@/composables/useStore";
import { computed } from "vue";
import { ref } from "vue";
const { content } = useStore();

const emit = defineEmits(["create-item", "close-modal"]);

const isValid = ref("");

const nome = ref("");
const preco = ref("");
const fornecedor = ref("");
const dataCompra = ref("");
const evento = ref("");
const finalidade = ref("");
const descrição = ref("");
const comp = ref("");
const altura = ref("");
const larg = ref("");
const material = ref("");
const tipo = ref("");

const imgRef = ref("");
function handleDefineImg(event) {
  imgRef.value = event.target.files[0];
}

async function handleCreateItem() {
  const payload = {
    nome: nome.value,
    preco: preco.value,
    fornecedor: fornecedor.value,
    dataCompra: dataCompra.value,
    ano: dataCompra.value.split("-")[0],
    evento: evento.value,
    finalidade: finalidade.value,
    descrição: descrição.value,
    comp: comp.value,
    altura: altura.value,
    larg: larg.value,
    material: material.value,
    criador: content.auth.user.displayName,
    editor: "",
  };

  const imgpayload = imgRef.value;

  emit("create-item", payload, imgpayload);
}
const notEmptyRule = [
  (value) => {
    if (value) return true;
    return "Campo Obrigatório";
  },
];
</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <v-card class="w-50 pl-3 pr-3 pb-4 mx-auto elevation-0">
      <div class="d-flex justify-center align-center ma-3">
        <h2>Criar novo Registro</h2>
        <v-btn
          class="close-btn"
          icon="mdi-window-close"
          @click="$emit('close-modal')"
        ></v-btn>
      </div>
      <v-form v-model="isValid">
        <v-text-field type="file" :onchange="handleDefineImg"></v-text-field>

        <v-row>
          <v-col>
            <v-text-field
              v-model="nome"
              label="Nome do item"
              :rules="notEmptyRule"
            ></v-text-field>

            <v-tooltip
              text="Tipo do brinde, Ex: carteira, mochila, caneta..."
              location="top"
              v-slot:activator="{ props }"
            >
              <v-text-field
                v-model="tipo"
                v-bind="props"
                label="Tipo"
              ></v-text-field>
            </v-tooltip>

            <v-text-field
              v-model="fornecedor"
              label="Fornecedor"
              :rules="notEmptyRule"
            ></v-text-field>
            <v-text-field
              v-model="dataCompra"
              type="date"
              label="Data Compra"
              :rules="notEmptyRule"
            ></v-text-field>
            <v-text-field
              v-model="preco"
              append-inner-icon="mdi-cash"
              type="price"
              label="Valor"
            ></v-text-field>
            <v-text-field
              v-model="evento"
              :rules="notEmptyRule"
              label="Evento"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-tooltip
              text="Descrição geral do item"
              location="top"
              v-slot:activator="{ props }"
            >
              <v-text-field
                v-model="descrição"
                v-bind="props"
                label="Descrição"
              ></v-text-field>
            </v-tooltip>

            <v-text-field v-model="comp" label="Comprimento"></v-text-field>
            <v-text-field v-model="altura" label="Altura"></v-text-field>
            <v-text-field v-model="larg" label="Largura"></v-text-field>

            <v-text-field v-model="material" label="Material"></v-text-field>

            <v-tooltip
              text="Para quem é destinado, ex: Cio, patrocinador, acompanhante..."
              location="top"
              v-slot:activator="{ props }"
            >
              <v-text-field
                v-model="finalidade"
                v-bind="props"
                label="Finalidade"
              ></v-text-field>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-btn
          @click="handleCreateItem"
          :disabled="!isValid"
          :loading="content.items.loading"
          class="w-100"
          variant="tonal"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
