// Plugins
import { registerPlugins } from '@/plugins'

import "../firebase.config.js"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/modules/auth"
/* import "@/modules/create"
import "@/modules/itens" */

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.mount('#app')
