import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { vue3Debounce } from 'vue-debounce'
import { clickOutside } from './directives/click-outside'
import { router } from './router'
import App from './App.vue'
import './global.css'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App)
  .directive('debounce', vue3Debounce({}))
  .directive('click-outside', clickOutside)
  .use(router)
  .use(createPinia())
  .mount('#root')
