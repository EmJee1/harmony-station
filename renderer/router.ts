import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
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
    {
      path: '/queue',
      component: () => import('./views/Queue.vue'),
    },
  ],
})
