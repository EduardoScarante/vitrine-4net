<script setup>
defineProps({
  action: String,
  item: String,
  modal: Boolean,
});

defineEmits(["close", "delete-item", "update-item"]);
</script>

<template>
  <v-card v-if="modal" class="container d-flex w-100 h-100">
    <v-card class="w-25 ma-auto bg-white elevation-10">
      <header class="d-flex justify-center bg-red">
        <h3>AVISO</h3>
      </header>
      <v-card-text class="d-flex justify-center">
        <p>Confirmar {{ action == 'delete' ? 'deleção' : 'edição'  }} do item: <b> {{ item }}</b
        >?</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="black" class="w-50 buttonCanc" @click="$emit('close')"
          >Cancelar</v-btn
        >
        <v-btn color="black" class="w-50 buttonConf ml-1" @click="action == 'delete' ? $emit('delete-item') : $emit('update-item')"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card> </v-card
  >
</template>

<style scoped>
.container{
    position: fixed;
    top: 0; right: 0;
    background-color: rgb(0, 0, 0, 0.2);
    opacity: 0.95;
}

.buttonConf :hover {
color: green}

.buttonCanc :hover {
color: red}
</style>
