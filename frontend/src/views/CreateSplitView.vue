<script setup lang="ts">
import { onMounted } from 'vue'

import { useSplitStore } from '@/stores/splitStore'
import FriendsList from '@/components/FriendsList.vue'
import SplitEntriesList from '@/components/SplitEntriesList.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useSplitStore()
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const transactionId = route.params.id as string
onMounted(() => {
  store.getNewSplitData(transactionId)
})
</script>
<template>
  <button @click="router.back">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-10"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  </button>
  <div v-if="store.transaction" class="py-4">
    <div class="avatar mb-8">
      <div class="w-20 rounded-xl">
        <img :src="store.transaction.avatar" />
      </div>
    </div>
    <h2 class="text-lg">Split Bill</h2>
    <div class="flex w-full items-center">
      <h1 class="text-2xl font-bold">{{ store.transaction.name }}</h1>
      <span class="ml-auto">{{ currencyFormatter.format(store.transaction.amount) }}</span>
    </div>
  </div>
  <FriendsList />
  <div v-if="store.splitEntries.length > 0">
    <SplitEntriesList />
    <h3 class="font-bold text-xl mt-12 mb-4">Any additional notes to add to your request</h3>
    <textarea
      class="textarea textarea-accent placeholder:text-white w-full"
      v-model="store.notes"
      placeholder="Notes"
    ></textarea>
    <button
      class="btn btn-success mt-8 w-full"
      @click="store.submitSplitData(transactionId)"
      :disabled="store.loading"
    >
      {{ store.loading ? 'Submitting...' : 'Submit Split Request' }}
    </button>
  </div>
  <div v-if="store.successfulUpload">
    <div class="toast toast-center toast-top">
      <div class="alert alert-success">
        <span>Message sent successfully.</span>
      </div>
    </div>
  </div>
</template>
