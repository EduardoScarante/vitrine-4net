<script setup>
import { ref } from "vue";

defineProps({
  info: Object,
});
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <div>
          <v-btn icon="mdi-pencil" class="mr-2"></v-btn>
          <v-btn icon="mdi-trash-can-outline"></v-btn>
        </div>
        <div>
          <v-btn icon="mdi-window-close" @click="this.$emit('close-modal')"></v-btn>
        </div>
      </div>

      <div class="d-flex mt-5 
      ">
        <div class="image-container d-flex justify-space-around">
          <v-img class="custom-border" :width="300" :height="450" src="https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/7c/ea/f0/7ceaf0da-d4d3-3426-a95b-c592a2b3f58e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"></v-img>
        </div>

        <div class="details">
          <h1>{{ info.data.nome }}</h1>
          <div class="info-row">
            <div>
              <h3>Finalidade:</h3>
              <p>{{ info.data.finalidade }}</p>
            </div>
            <div>
              <h3>Evento:</h3>
              <p>{{ info.data.evento }}</p>
            </div>
            <div>
              <h3>Preço: R$</h3>
              <p>{{ info.data.preco }}</p>
            </div>
            <div>
              <h3>Fornecedor:</h3>
              <p>{{ info.data.fornecedor }}</p>
            </div>
            <div>
              <h3>Ano:</h3>
              <p>{{ info.data.dataCompra }}</p>
            </div>
          </div>

          <h2>Informações Técnicas</h2>
          <div class="info-row">
            <div>
              <h3>Altura:</h3>
              <p>{{ info.data.altura }}</p>
            </div>
            <div>
              <h3>Comprimento:</h3>
              <p>{{ info.data.comp }}</p>
            </div>
            <div>
              <h3>Largura:</h3>
              <p>{{ info.data.larg }}</p>
            </div>
            <div>
              <h3>Materiais:</h3>
              <p>{{ info.data.material }}</p>
            </div>
          </div>

          <h2>Descrição</h2>
          <p class="custom-scroll">{{ info.data.descricao }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  height: 75vh;
  width: 75vw;
  background-color: white;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
}

.image-container {
  width: 50%;
  display: flex;
  align-items: center;
  border: 0.5px solid darkgray;
}

.custom-border {
  border: 0.5px solid darkgray;
}

.details {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
}

.custom-scroll {
  width: 600px;
  height: 150px;
  overflow-y: auto;
  border: 1px solid darkgray;
  margin-top: 1rem;
}
</style>

