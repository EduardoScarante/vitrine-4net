<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
const { content } = useStore();

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

const emit = defineEmits(["customChange"]);

async function handleCreateItem() {
  const payload = {
    nome: nome.value,
    preco: preco.value,
    fornecedor: fornecedor.value,
    dataCompra: dataCompra.value,
    evento: evento.value,
    finalidade: finalidade.value,
    descrição: descrição.value,
    comp: comp.value,
    altura: altura.value,
    larg: larg.value,
    material: material.value,
  };

  const imgpayload = imgRef.value;

  emit("create-item", payload, imgpayload);
}
</script>

<template>
  <div class="container h-100 w-100 d-flex align-center justify-center">
    <v-card class="w-50 pl-3 pr-3 pb-4 mx-auto elevation-0">
      <div class="d-flex justify-center align-center ma-3">
        <h2>Criar novo Registro</h2>
        <v-btn
          class="close-btn"
          icon="mdi-window-close"
          @click="this.$emit('close-modal')"
        ></v-btn>
      </div>
      <v-form>
        <v-text-field type="file" :onchange="handleDefineImg"></v-text-field>

        <v-row>
          <v-col>
            <h3>Dados do Item</h3>
            <v-text-field v-model="nome" label="Item"></v-text-field>
            <v-text-field v-model="tipo" label="Tipo"></v-text-field>
            <v-text-field
              v-model="fornecedor"
              label="Fornecedor"
            ></v-text-field>
            <v-text-field
              v-model="dataCompra"
              type="date"
              label="Data Compra"
            ></v-text-field>
            <v-text-field
              v-model="preco"
              type="number"
              label="Preço"
            ></v-text-field>

            <h3>Evento</h3>
            <v-text-field v-model="evento" label="Evento"></v-text-field>
            <v-text-field
              v-model="finalidade"
              label="Finalidade"
            ></v-text-field>
          </v-col>

          <v-col>
            <h3>Informações Gerais</h3>

            <v-text-field v-model="descrição" label="Descrição"></v-text-field>
            <v-text-field v-model="comp" label="Comprimento"></v-text-field>
            <v-text-field v-model="altura" label="Altura"></v-text-field>
            <v-text-field v-model="larg" label="Largura"></v-text-field>
            <v-text-field v-model="material" label="Material"></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="handleCreateItem" class="w-100" variant="tonal"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0; right: 0;
  background-color: rgb(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 5px; right: 10px;
}
</style>
