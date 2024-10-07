<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<template>
  <div class="navbar bg-neutral">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Bill Splitter</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a>Requests</a></li>
        <li><button @click="auth.logout">Logout</button></li>
      </ul>
    </div>
  </div>
</template>
