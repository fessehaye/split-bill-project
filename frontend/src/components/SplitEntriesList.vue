<script setup lang="ts">
import { useSplitStore } from '@/stores/splitStore'
const store = useSplitStore()
</script>

<template>
  <h3 class="font-bold text-xl mt-12 mb-4">Assign each contact the cost they are covering</h3>
  <div class="space-y-4">
    <div
      v-for="entry in store.splitEntries"
      :key="entry.id"
      class="form-control border-primary border rounded-md px-2"
    >
      <label class="cursor-pointer label">
        <span class="label-text font-bold">{{ entry.name }}</span>
        <input
          type="number"
          placeholder="amount"
          v-model="entry.amount"
          class="input w-full max-w-36 placeholder:text-white p-0 h-auto"
        />
      </label>
    </div>
  </div>
</template>
