import { mande } from 'mande'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

interface LoginData {
  message: string
  token: string
  userId: string
}

const api = mande(`${import.meta.env.VITE_BE_URL}`)

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const appToken = ref(localStorage.getItem('app_token'))
  const userId = ref(localStorage.getItem('user_id'))

  const isAuthenticated = computed(() => appToken.value != null)

  async function logout() {
    try {
      await api.post('logout')
      localStorage.removeItem('app_token')
      localStorage.removeItem('user_id')
      appToken.value = null
      userId.value = null
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  async function login(email: string, password: string) {
    try {
      const data = await api.post<LoginData>('login', { email, password })
      if (data.token) {
        localStorage.setItem('app_token', data.token)
        localStorage.setItem('user_id', data.userId)
        appToken.value = data.token
        userId.value = data.userId
        router.push('/dashboard')
      } else {
        return 'Can not login, please try again!'
      }
    } catch (error) {
      return 'Can not login, please try again!'
    }
  }

  return { logout, login, appToken, isAuthenticated, userId }
})
