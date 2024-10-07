import { mande } from 'mande'
import { defineStore } from 'pinia'
import { computed, watch, ref } from 'vue'
import { useAuthStore } from './authStore'

export interface Account {
  id: string
  name: string
  remaining: number
  budget: number
  balance: number
}

export interface Transaction {
  id: string
  name: string
  avatar: string
  amount: number
  date: string
}

interface ProfileResponse {
  name: string
  accounts: Account[]
}

interface TransactionsResponse {
  transactions: Transaction[]
}

const api = mande(`${import.meta.env.VITE_BE_URL}dashboard-profile`)

export const useDashboardStore = defineStore('dashboard', () => {
  const auth = useAuthStore()
  api.options.headers.Authorization = auth.appToken

  const name = ref('')
  const accounts = ref<Account[]>([])
  const transactions = ref<Transaction[]>([])
  const loading = ref(false)
  const selectedAccountIndex = ref<number | null>(null)

  const selectedAccount = computed(() => {
    return selectedAccountIndex.value !== null ? accounts.value[selectedAccountIndex.value] : null
  })

  function updateAccount(index: number) {
    selectedAccountIndex.value = index
  }

  async function getProfile() {
    accounts.value.length = 0
    try {
      const profileResponse = await api.get<ProfileResponse>()
      name.value = profileResponse.name
      accounts.value.push(...profileResponse.accounts)
      if (accounts.value.length > 0) {
        selectedAccountIndex.value = 0
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getTransactions(page: number = 1) {
    transactions.value.length = 0
    if (selectedAccount.value === null || selectedAccount.value === undefined) {
      return
    }
    try {
      loading.value = true
      const transactionResponse = await api.get<TransactionsResponse>(
        `/transactions/${selectedAccount.value.id}?page=${page}`
      )
      transactions.value.push(...transactionResponse.transactions)
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  watch(selectedAccount, async () => {
    await getTransactions(1)
  })

  return {
    getProfile,
    name,
    accounts,
    selectedAccount,
    selectedAccountIndex,
    updateAccount,
    loading,
    transactions
  }
})
