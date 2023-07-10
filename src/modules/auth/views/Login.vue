<script setup>

import { useStore } from "@/composables/useStore";
const { content } = useStore();
const { auth } = content


const teste = auth.user

content.auth.teste('a', 'b')
</script>


<template>
    Login
    {{ teste }}
</template>