<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboard = useDashboardStore()

function updateAccount(index: number) {
  dashboard.updateAccount(index)
}
</script>

<template>
  <div class="flex space-x-4 mt-4">
    <div v-for="(account, index) in dashboard.accounts" :key="account.id">
      <button
        class="btn btn-outline btn-primary"
        :class="{ 'btn-active': dashboard.selectedAccountIndex === index }"
        @click="updateAccount(index)"
      >
        {{ account.name }}
      </button>
    </div>
  </div>
</template>
