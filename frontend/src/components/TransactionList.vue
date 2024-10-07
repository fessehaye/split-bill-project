<script setup lang="ts">
import { useDashboardStore, type Transaction } from '@/stores/dashboardStore'
import { computed } from 'vue'
import { groupBy } from '@/utils/index'
import { RouterLink } from 'vue-router'

const dashboard = useDashboardStore()
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
function getDateKey(transaction: Transaction) {
  const day = new Date(transaction.date)
  day.setUTCHours(0, 0, 0, 0)
  return day.toISOString()
}

function formatDateHeader(datestring: string) {
  const date = new Date(datestring)

  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
  return formatter.format(date)
}

function getTotal(data: Transaction[]) {
  const total = data.reduce((prev, curr) => {
    return prev + curr.amount
  }, 0)

  return currencyFormatter.format(total)
}

const transactionsGroups = computed(() => {
  const groups = groupBy(dashboard.transactions, getDateKey)
  // To sort by keys
  return [
    ...new Map(
      [...groups].sort((a, b) => {
        return String(b[0]).localeCompare(a[0])
      })
    ).entries()
  ]
})
</script>

<template>
  <div class="mt-8">
    <div v-if="dashboard.loading">
      <span class="loading loading-ring loading-lg"></span>
    </div>
    <div v-if="dashboard.transactions.length > 0" class="space-y-4">
      <div v-for="[date, data] in transactionsGroups" :key="date">
        <div class="flex">
          <span class="font-bold text-lg">{{ formatDateHeader(date) }}</span>
          <span class="ml-auto mr-4">{{ getTotal(data) }}</span>
        </div>
        <div class="space-y-3 mt-3 last:mb-8">
          <RouterLink
            :to="{ name: 'transaction', params: { id: transaction.id } }"
            v-for="transaction in data"
            :key="transaction.id"
            class="flex h-11 bg-neutral hover:bg-neutral-content rounded transition-all duration-200 shadow-xl"
          >
            <img :src="transaction.avatar" class="w-auto h-full object-cover" alt="avatar" />
            <div class="flex items-center w-full py-3 px-4">
              <h2 class="font-bold">{{ transaction.name }}</h2>
              <span class="ml-auto">{{ currencyFormatter.format(transaction.amount) }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
