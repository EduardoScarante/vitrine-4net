<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
const { content } = useStore();


import { useRouter } from "vue-router";
const router = useRouter();


const nome = ref('')
const preco = ref('')
const fornecedor = ref('')
const dataCompra = ref('')
const evento = ref('')
const finalidade = ref('')
const descrição = ref('')
const comp = ref('')
const altura = ref('')
const larg = ref('')
const material = ref('')


const imgRef = ref('')
function handleDefineImg(event) {
  imgRef.value = event.target.files[0];
}

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
  }

  const imgpayload = imgRef.value
  const res = await content.items.createItem(payload, imgpayload)

  if (res) {
    alert("criado com sucesso!")
  }
}


</script>

<template>
  <v-card class="w-50 mx-auto elevation-0">
    <div class="d-flex justify-center">
      <h2>Criar novo Registro</h2>
    </div>
    <v-form>
      <v-text-field type="file" :onchange="handleDefineImg"></v-text-field>

      <v-row>
        <v-col>
          <h3>Dados do Item</h3>
          <v-text-field v-model="nome" label="Item"></v-text-field>
          <v-text-field v-model="fornecedor" label="Fornecedor"></v-text-field>
          <v-text-field v-model="dataCompra" type="date" label="Data Compra"></v-text-field>
          <v-text-field v-model="preco" type="number" label="Preço"></v-text-field>

          <h3>Evento</h3>
          <v-text-field v-model="evento" label="Evento"></v-text-field>
          <v-text-field v-model="finalidade" label="Finalidade"></v-text-field>
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
      <v-btn @click="handleCreateItem" class="w-100" variant="tonal">Cadastrar</v-btn>
    </v-form>
  </v-card>
</template>
