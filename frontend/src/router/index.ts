import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'
import TransactionView from '@/views/TransactionView.vue'
import CreateSplitView from '@/views/CreateSplitView.vue'
import WorkInProgress from '@/views/WorkInProgress.vue'
import DefaultLayout from '@/views/DefaultLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard/',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/dashboard/transaction-view/:id',
          name: 'transaction',
          component: TransactionView
        },
        {
          path: '/dashboard/create-split/:id',
          name: 'create-split',
          component: CreateSplitView
        },
        { path: '/dashboard/work-in-progress', name: 'work-in-progress', component: WorkInProgress }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.name !== 'login' && !auth.isAuthenticated) next({ name: 'login' })
  else if (to.name === 'login' && auth.isAuthenticated) next({ name: 'dashboard' })
  else next()
})

export default router
