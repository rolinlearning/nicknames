import { createRouter, createWebHistory } from 'vue-router'
import NicknameManager from '@/components/NicknameManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NicknameManager,
    }
  ],
})

export default router
