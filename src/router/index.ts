import { createRouter, createWebHashHistory } from 'vue-router'

const routes: any = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: 'work',
    path: '/work',
    component: () => import('@/views/work/index.vue'),
  },
  {
    name: 'blog',
    path: '/blog',
    component: () => import('@/views/blog/index.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/about/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
