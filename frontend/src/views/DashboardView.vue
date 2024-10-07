<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import UserHeader from '@/components/UserHeader.vue'
import AccountSelector from '@/components/AccountSelector.vue'
import TransactionList from '@/components/TransactionList.vue'

const dashboard = useDashboardStore()

onMounted(() => {
  dashboard.getProfile()
})
</script>

<template>
  <UserHeader />
  <div class="pb-8">
    <AccountSelector />
    <TransactionList />
  </div>
</template>
