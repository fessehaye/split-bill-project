<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>
<template>
  <main class="h-screen">
    <NavBar />
    <div class="mx-auto container max-w-5xl px-4 py-6">
      <RouterView />
    </div>
  </main>
</template>
