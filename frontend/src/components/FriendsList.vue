<script setup lang="ts">
import { useSplitStore, type Friend } from '@/stores/splitStore'
const store = useSplitStore()
const isInEntries = (id: string) => {
  if (!store.splitEntries || store.splitEntries.length === 0) {
    return false
  }
  return store.splitEntries.some((entry) => entry.id == id)
}

function calcSplitAmount() {
  const totalCost = store.transaction?.amount || 0
  return Math.round((totalCost / store.splitEntries.length) * 100) / 100
}

function toggleEntries(friend: Friend, checked: boolean | null) {
  if (checked) {
    store.splitEntries.push({ id: friend.id, name: friend.name, amount: 0 })
    const newEntries = store.splitEntries.map((entry) => {
      return { ...entry, amount: calcSplitAmount() }
    })
    store.splitEntries = newEntries
  } else {
    const index = store.splitEntries.findIndex((entry) => entry.id === friend.id)
    store.splitEntries.splice(index, 1)
    const newEntries = store.splitEntries.map((entry) => {
      return { ...entry, amount: calcSplitAmount() }
    })
    store.splitEntries = newEntries
  }
}
</script>

<template>
  <h3 class="font-bold text-xl mt-8 mb-4">Choose which contacts to add</h3>
  <div class="space-y-4">
    <div
      v-for="friend in store.friends"
      :key="friend.id"
      class="form-control border-accent border rounded-md px-2"
    >
      <label class="cursor-pointer label">
        <span class="label-text font-bold">{{ friend.name }}</span>
        <input
          type="checkbox"
          class="checkbox checkbox-accent"
          :value="isInEntries(friend.id)"
          @change="toggleEntries(friend, ($event.target as any).checked)"
        />
      </label>
    </div>
  </div>
</template>
