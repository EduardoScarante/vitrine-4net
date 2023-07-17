<script setup>
defineProps({
  action: String,
  item: String,
  modal: Boolean,
});
</script>

<template>
  <v-card v-if="modal" class="container d-flex w-100 h-100">
    <v-card class="w-25 ma-auto bg-white elevation-10">
      <v-card-text>
        Confirmar {{ action == 'delete' ? 'deleção' : 'edição'  }} do item: <b>{{ item }}</b
        >?
      </v-card-text>
      <v-card-actions>
        <v-btn color="black" class="w-50" @click="this.$emit('close')"
          >Cancelar</v-btn
        >
        <v-btn color="black" class="w-50" @click="action == 'delete' ? this.$emit('delete-item') : this.$emit('update-item')"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card> </v-card
  >I
</template>

<style scoped>
.container{
    position: fixed;
    top: 0; right: 0;
    background-color: rgb(0, 0, 0, 0.2);
}
</style>
