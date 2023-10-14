import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { vue3Debounce } from 'vue-debounce'
import { router } from './router'
import App from './App.vue'
import './global.css'

createApp(App)
  .directive('debounce', vue3Debounce({}))
  .use(router)
  .use(createPinia())
  .mount('#root')
