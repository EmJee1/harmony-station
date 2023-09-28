import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import './global.css'

createApp(App).use(router).use(createPinia()).mount('#root')
