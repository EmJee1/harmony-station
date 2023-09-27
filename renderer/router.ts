import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
  ],
})
