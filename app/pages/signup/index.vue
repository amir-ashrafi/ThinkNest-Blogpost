<template>
<section class="fixed z-50 overflow-hidden left-0 flex justify-center  items-center sm:items-center bg-amber-50 w-full min-h-screen top-0">
    <nav class="flex rel flex-col basis-1/2 lg:basis-3/5 md:justify-center md:items-center sm:px-12 py-20 gap-16">
        <NuxtLink class="text-4xl absolute top-7 left-7 text-amber-900 md:text-4xl md:block dancing-script cursor-pointer">
             ThinkNest
        </NuxtLink>
        <form action="" class="flex flex-col  relative gap-7 py-4 md:justify-center md:items-center   sm:max-w-[400px]">
            <div class="text-left w-full -translate-x-4 sm:translate-x-0  sm:pl-3">
              <p class="font-medium text-amber-800/50">Start your journey</p>
              <h1 class="font-bold text-2xl">Sign Up to ThinkNeat</h1>
            </div>
            <div class="input_global w-full   flex gap-2">
              
              <label for="fullname" class="">FullName</label>
              <input type="text" class="md:w-[400px]"/>
              <div class="h-full w-full basis-1/12"> 
                
                <select  class="w-[4.6rem] h-12 text-[1.09rem] text-start border-2 border-amber-900 rounded-lg shadow-sm bg-amber-50 text-gray-700 
           focus:outline-none focus:ring focus:ring-amber-900 focus:border-amber-600 cursor-pointer" name="" id="">
                  <option value="">user</option>
                  <option value="">author</option>
                </select>
                <label for=""></label>
              </div>
            </div>
            <div class="input_global">
            <label for="email" class="">Email</label>
            <input
              id="email"
              type="email"
              v-model.trim="email"
              autocomplete="email"
              :aria-invalid="!!errors.email"
              class="w-full "
              placeholder="you@example.com"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
          </div>

          <!-- رمز عبور -->
          <div class="w-full">
            <div class="input_global ">
              <label for="password" class="">Password</label>
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


          <!-- دکمه ارسال -->
          <button
            type="submit"
            class="button_global"
            :disabled="loading"
          >
            {{ loading ? 'Registering...' : 'Sign Up' }}
          </button>

          <!-- جداکننده -->
          <div class="flex w-full items-center gap-3 h-1">
            <span class="h-px flex-1 bg-amber-900/50"></span>
            <span class="text-xs text-amber-900">یا</span>
            <span class="h-px flex-1 bg-amber-900/50"></span>
          </div>

          <!-- ورود اجتماعی (اختیاری) -->
          <div class="flex justify-around md:w-full  text-black">
            <button
            v-for="item in data_icon"
              :key="item.id"

              type="button"
              class=" border px-5 py-3 rounded-xl cursor-pointer hover:border-amber-400 border-amber-950/50"
              @click="loginWithProvider(item.function)"
            >
             <Icon :icon="item.name" width="30" height="30" />
            </button>
          </div>

          <p class="text-center absolute -bottom-6  text-sm text-gray-600">
            Have an account
            <NuxtLink to="/register" class="text-amber-700 font-bold hover:underline">Sign In</NuxtLink>
          </p>
            
        </form>
    </nav>
    <nav class="basis-1/2 lg:basis-2/5 hidden md:block min-h-screen  justify-end">
        <img src="/background.webp" alt="login-background" class="w-full min-h-screen object-cover max-w-[700px] md:max-w-full">
    </nav>
</section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const formError = ref<string | null>(null)
const errors = ref<{ email?: string; password?: string }>({})
const data_icon = [
  {
    id:0,
    name:'flat-color-icons:google',
    function:'google',
  },
  {
    id:1,
    name:'logos:facebook',
    function:'facebook',
  },
  {
    id:2,
    name:'logos:apple',
    function:'apple',
  }
]

function validate() {
  errors.value = {}
  let ok = true

  if (!email.value) {
    errors.value.email = 'ایمیل الزامی است.'
    ok = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'فرمت ایمیل معتبر نیست.'
    ok = false
  }

  if (!password.value) {
    errors.value.password = 'رمز عبور الزامی است.'
    ok = false
  } else if (password.value.length < 8) {
    errors.value.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد.'
    ok = false
  }

  return ok
}

async function onSubmit() {
  formError.value = null
  if (!validate()) return

  loading.value = true
  try {
    // اینجا به API واقعی خودت وصل شو:
    // مثال: /api/auth/login (NextAuth/NuxtAuth یا بک‌اند شخصی)
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        remember: remember.value,
      },
    })

    // فرض: اگر موفق بود، ریدایرکت کن
    await navigateTo('/dashboard')
  } catch (err: any) {
    formError.value = err?.data?.message || 'ورود ناموفق بود. لطفاً مجدد تلاش کنید.'
  } finally {
    loading.value = false
  }
}

async function loginWithProvider(provider: 'google' | 'facebook' | 'apple' | 'github') {
  try {
    // اگر از Auth.js (یا NuxtAuth) استفاده می‌کنی:
    // اینجا پرووایدر داینامیک وارد میشه
    await signIn(provider, { callbackUrl: '/dashboard' })
    console.log(`Login with ${provider}`)
  } catch (error) {
    console.error(`Error logging in with ${provider}:`, error)
  }
}
</script>