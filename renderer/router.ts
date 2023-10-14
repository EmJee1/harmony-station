import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/album/:id',
      component: () => import('./views/Album.vue'),
    },
    {
      path: '/artist/:id',
      component: () => import('./views/Artist.vue'),
    },
    {
      path: '/settings',
      component: () => import('./views/Settings.vue'),
    },
  ],
})
