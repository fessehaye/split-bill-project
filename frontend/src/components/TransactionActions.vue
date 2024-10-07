<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string
</script>
<template>
  <div class="space-y-4 mt-8 last:mb-8">
    <RouterLink
      :to="{ name: 'work-in-progress', params: {} }"
      class="flex items-center bg-neutral hover:bg-neutral-content rounded transition-all duration-200 shadow-xl px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 mr-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>

      <div class="w-full py-3">
        <div class="font-bold">Change Category</div>
        <div class="">Change category of current transaction</div>
      </div>
    </RouterLink>

    <RouterLink
      :to="{ name: 'create-split', params: { id: id } }"
      class="flex items-center bg-neutral hover:bg-neutral-content rounded transition-all duration-200 shadow-xl px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 mr-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>

      <div class="w-full py-3">
        <div class="font-bold">Split this bill</div>
        <div class="">Instantly get paid back by your friends</div>
      </div>
    </RouterLink>

    <RouterLink
      :to="{ name: 'work-in-progress', params: {} }"
      class="flex items-center bg-neutral hover:bg-neutral-content rounded transition-all duration-200 shadow-xl px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 mr-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
        />
      </svg>

      <div class="w-full py-3">
        <div class="font-bold">Add to shared tab</div>
        <div class="">A simple way to manage shared experiences</div>
      </div>
    </RouterLink>

    <RouterLink
      :to="{ name: 'work-in-progress', params: {} }"
      class="flex items-center bg-neutral hover:bg-neutral-content rounded transition-all duration-200 shadow-xl px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 mr-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      <div class="w-full py-3">
        <div class="font-bold">Add notes</div>
        <div class="">Add notes to describe this payment</div>
      </div>
    </RouterLink>
  </div>
</template>
