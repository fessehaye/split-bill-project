import { mande } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'

export interface TransactionData {
  category: string
  avatar: string
  name: string
  amount: number
}

const api = mande(`${import.meta.env.VITE_BE_URL}transaction/`)

export const useTransactionStore = defineStore('transaction', () => {
  const auth = useAuthStore()
  api.options.headers.Authorization = auth.appToken
  const transaction = ref<TransactionData | undefined>(undefined)
  async function getTransaction(id: string) {
    try {
      const transactionRepsonse = await api.get<TransactionData>(id)
      transaction.value = transactionRepsonse
    } catch (error) {
      console.error(error)
    }
  }

  return { getTransaction, transaction }
})
