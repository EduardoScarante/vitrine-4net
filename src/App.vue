<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "@/composables/useStore";

const { content } = useStore();

onMounted(() => {
  content.auth.activeUser()
});
</script>
