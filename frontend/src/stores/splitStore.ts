import { mande } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { type TransactionData } from './transactionStore'
import { useRouter } from 'vue-router'

export interface Friend {
  name: string
  id: string
}

interface SplitInfoData {
  friends: Friend[]
  transaction: TransactionData
}

interface SplitEntry {
  id: string
  amount: number
  name: string
}

const api = mande(`${import.meta.env.VITE_BE_URL}split/`)

export const useSplitStore = defineStore('split', () => {
  const auth = useAuthStore()
  const router = useRouter()

  api.options.headers.Authorization = auth.appToken

  const friends = ref<Friend[]>([])
  const loading = ref(false)
  const notes = ref('')
  const successfulUpload = ref(false)
  const splitEntries = ref<SplitEntry[]>([])
  const transaction = ref<TransactionData | undefined>(undefined)

  async function getNewSplitData(id: string) {
    friends.value.length = 0
    try {
      const dataResponse = await api.get<SplitInfoData>(id)
      transaction.value = dataResponse.transaction
      friends.value.push(...dataResponse.friends)
    } catch (error) {
      console.error(error)
    }
  }

  async function submitSplitData(id: string) {
    const userConfirmed = window.confirm(
      'Are you sure you want to proceed and create a new split request with your contacts selected?'
    )
    try {
      if (userConfirmed) {
        loading.value = true
        const entries = splitEntries.value.map((entry) => {
          return { id: entry.id, amount: entry.amount }
        })
        const notevalue = notes.value
        await api.post<SplitInfoData>(id, { notes: notevalue, entries })

        // resetting store
        loading.value = false
        successfulUpload.value = true
        splitEntries.value.length = 0
        friends.value.length = 0
        setTimeout(() => {
          successfulUpload.value = false
          router.push('/dashboard')
        }, 1000)
      }
    } catch (error) {
      loading.value = false
      console.error(error)
    }
  }

  return {
    getNewSplitData,
    submitSplitData,
    friends,
    transaction,
    splitEntries,
    loading,
    successfulUpload,
    notes
  }
})
