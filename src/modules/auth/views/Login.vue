<script setup>
import { useStore } from "@/composables/useStore";
import { ref } from "vue";
import { onMounted } from "vue";

const { content } = useStore();
const { auth } = content


const email = ref('')
const password = ref('')

async function handleSignIn() {
    const res = await auth.signIn(email.value, password.value)
    console.log(res);
}

async function handleSignUp() {
    const res = await auth.signUp(email.value, password.value)
    console.log(res);
}

const user = content.auth.user
</script>

<template>
    <main>
        <input type="email" v-model="email" placeholder="email"/>
        <input type="password" v-model="password" placeholder="senha"/>
        <button @click="handleSignIn">Logar</button>
    </main>
    Login
    usuário -> {{ user }}

    <main>
        <input type="email" v-model="email" placeholder="email"/>
        <input type="password" v-model="password" placeholder="senha"/>
        <button @click="handleSignUp">Criar</button>
    </main>
</template>