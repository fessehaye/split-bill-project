<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const formData = reactive({
  email: '',
  password: ''
})

const errors = ref<string[]>([])

async function handleSubmit() {
  errors.value = [] // Clear previous errors

  if (!formData.password) {
    errors.value.push('Password is required.')
  }
  if (!formData.email) {
    errors.value.push('Email is required.')
  }

  if (!errors.value.length) {
    try {
      const loginMsg = await auth.login(formData.email, formData.password)
      if (loginMsg) {
        errors.value.push(loginMsg)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    formData.password = ''
    formData.email = ''
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Sign in to your account
      </h1>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6">Email address </label>
          <div class="mt-2">
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6">Password </label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="formData.password"
              autocomplete="current-password"
              required="true"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div class="text-red-500" v-if="errors.length">
          <ul>
            <li v-for="(error, index) in errors" :key="index" class="">{{ error }}</li>
          </ul>
        </div>

        <div>
          <button type="submit" class="btn btn-block">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>
