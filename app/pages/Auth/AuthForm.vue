<template>
<section class="fixed z-50 overflow-hidden left-0 flex justify-center items-center sm:items-center bg-amber-50 w-full min-h-screen transition duration-150 ease-in-out  top-0">
  <nav class="flex rel flex-col basis-1/2 lg:basis-3/5 md:justify-center md:items-center sm:px-12 py-20 gap-16">

    <!-- لوگو -->
    <NuxtLink class="text-4xl absolute top-7 left-7 text-amber-900 md:text-4xl md:block dancing-script cursor-pointer">
      ThinkNest
    </NuxtLink>

    <!-- فرم -->
    <form class="flex md:gap-9 flex-col  relative  gap-7 py-4 md:justify-center md:items-center  sm:max-w-[450px]" :class="mode === 'signin'?'lg:mb-40':''" @submit.prevent="onSubmit" >

      <!-- متن بالای فرم -->
      <div class="text-left w-full -translate-x-4 sm:translate-x-0 md:-translate-x-5  sm:pl-3">
        <p class="font-medium text-amber-800/50">
          {{ mode === 'signup' ? 'Start your journey' : 'Welcome back' }}
        </p>
        <h1 class="font-bold text-2xl">
          {{ mode === 'signup' ? 'Sign Up to ThinkNeat' : 'Sign In to ThinkNeat' }}
        </h1>
      </div>

      <!-- فقط در حالت signup -->
      <div v-if="mode === 'signup'" class="input_global w-full   flex gap-2">
        <label for="fullname">Full Name</label>
        <input type="text" class="md:w-[320px]" />
        <div class="h-full w-full basis-1/12">
          <select class="w-[4.6rem] h-12 text-[1.09rem] text-start border-2 border-amber-900 rounded-lg shadow-sm bg-amber-50 text-gray-700 
           focus:outline-none focus:ring focus:ring-amber-900 focus:border-amber-600 cursor-pointer ">
            <option value="user">user</option>
            <option value="author">author</option>
          </select>
        </div>
      </div>

      <!-- ایمیل -->
      <div class="input_global w-full flex gap-2">
        <label for="email">Email</label>
        <input
              id="email"
              type="email"
              v-model.trim="email"
              autocomplete="email"
              :aria-invalid="!!errors.email"
              class="w-full"
              :class="mode === 'signin' ?`min-w-[300px] sm:min-w-[403px]` : ` `"
              placeholder="you@example.com"
        />
        <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
      </div>

      <!-- پسورد -->
      <div class="w-full">
        <div class="input_global">
          <label for="password">Password</label>
          <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                autocomplete="current-password"
                :aria-invalid="!!errors.password"
                class="w-full "
                placeholder='At least 8 characters'
          />
              <div class="relative">
                <button
                type="button"
                class="absolute inset-y-0 right-2 px-2 text-sm text-gray-600 hover:text-gray-900"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' :'Show password' "
              >
                {{ showPassword ? '👁️‍🗨️' : '👁️' }}
              </button>
              </div>
        </div>
      </div>
      <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>

      <!-- دکمه اصلی -->
      <button type="submit" class="button_global" :disabled="loading">
        {{ loading ? (mode === 'signup' ? 'Registering...' : 'Signing in...') : (mode === 'signup' ? 'Sign Up' : 'Sign In') }}
      </button>
        <!-- جداکننده -->

          <div class="flex w-full items-center gap-3 h-1">
            <span class="h-px flex-1 bg-amber-900/50"></span>
            <span class="text-xs text-amber-900">یا</span>
            <span class="h-px flex-1 bg-amber-900/50"></span>
          </div>
      <!-- سوشیال لاگین -->
      <div class="flex justify-around md:w-full text-black">
        <button
          v-for="item in data_icon"
          :key="item.id"
          type="button"
          class="border px-5 py-3 rounded-xl cursor-pointer hover:border-amber-400 border-amber-950/50"
          @click="loginWithProvider(item.function)"
        >
          <Icon :icon="item.name" width="30" height="30" />
        </button>
      </div>

      <!-- لینک جابجایی بین signup و signin -->
      <p class="text-center absolute -bottom-6  text-sm text-gray-600">
        {{ mode === 'signup' ? 'Have an account?' : "Don't have an account?" }}
        <NuxtLink :to="mode === 'signup' ? '/login' : '/signup'" class="text-amber-700 font-bold hover:underline">
          {{ mode === 'signup' ? 'Sign In' : 'Sign Up' }}
        </NuxtLink>
      </p>
    </form>
  </nav>

  <!-- سمت راست تصویر -->
  <nav class="basis-1/2 lg:basis-2/5 hidden md:block min-h-screen  justify-end">
    <img :src="mode === 'signin'?'12.webp':'/background.webp'" alt="login-background" class="w-full min-h-screen object-cover max-w-[700px] md:max-w-full">
  </nav>
</section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// گرفتن mode از props
const props = defineProps<{ mode: 'signup' | 'signin' }>()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errors = ref<{ email?: string; password?: string }>({})

const data_icon = [
  { id: 0, name: 'flat-color-icons:google', function: 'google' },
  { id: 1, name: 'logos:facebook', function: 'facebook' },
  { id: 2, name: 'logos:apple', function: 'apple' }
]

function validate() {
  errors.value = {}
  let ok = true
  if (!email.value) {
    errors.value.email = 'ایمیل الزامی است.'
    ok = false
  }
  if (!password.value) {
    errors.value.password = 'رمز عبور الزامی است.'
    ok = false
  }
  return ok
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    if (props.mode === 'signup') {
      await $fetch('/api/auth/register', { method: 'POST', body: { email: email.value, password: password.value } })
    } else {
      await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    }
    await navigateTo('/dashboard')
  } finally {
    loading.value = false
  }
}

async function loginWithProvider(provider: 'google' | 'facebook' | 'apple') {
  console.log(`Login with ${provider}`)
}
</script>
