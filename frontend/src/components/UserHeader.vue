<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'
const dashboard = useDashboardStore()

function daysLeftInMonth(): number {
  const today: Date = new Date()
  const currentYear: number = today.getFullYear()
  const currentMonth: number = today.getMonth()

  const nextMonth: Date = new Date(currentYear, currentMonth + 1, 1)
  const timeDifference: number = nextMonth.getTime() - today.getTime()
  const daysLeft: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1

  return daysLeft
}

const daysMsg = `${daysLeftInMonth()} ${daysLeftInMonth() > 1 ? 'days' : 'day'} left`
</script>

<template>
  <div class="mt-4">
    <div class="lg:flex lg:items-center lg:justify-between w-full">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          👋 Hey {{ dashboard.name }}
        </h2>
        <div
          v-if="dashboard.selectedAccount"
          class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
        >
          <div class="mt-2 flex items-center text-sm">
            Account: {{ dashboard.selectedAccount.name }}
          </div>
          <div class="mt-2 flex items-center text-sm">
            Balance: ${{ dashboard.selectedAccount.balance }}
          </div>
          <div class="mt-2 flex items-center text-sm">
            Budget: ${{ dashboard.selectedAccount.budget }}
          </div>
          <div class="mt-2 flex items-center text-sm">
            Remaining: ${{ dashboard.selectedAccount.remaining }} ({{ daysMsg }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
