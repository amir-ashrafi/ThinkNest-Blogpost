<template>
  <div class="container justify-center items-center  flex flex-col md:mt-5">
    <nav class="flex flex-col justify-center items-center">
      <h1 class="text-3xl font-semibold text-amber-950">Contact</h1>
      <p class="text-amber-900 font-light">We are here to help.</p>
    </nav>
    <div class="flex flex-col gap-4 mt-4 md:flex-row">
      <section id="section-left" class=" basis-2/5 p-3">
        <h2 class="text-xl font-medium text-amber-950 mb-2">Contact Stablo</h2>
        <p class="mb-4 font-sans text-amber-950">
          Have something to say? Fill up the form or send email or call phone.
        </p>
        <ul class="space-y-2 text-amber-900 font-medium">
          <li v-for="contact in contacts" :key="contact.type" class="flex items-center gap-2">
            <Icon :icon="contact.icon" class="text-amber-700  w-5 h-5" />
            <span>{{ contact.text }}</span>
          </li>
        </ul>
      </section>
  
      <form ref="form" @submit.prevent="sendEmail" class="flex flex-col gap-4 max-w-md text-amber-950 basis-3/5 mt-3">
      <input v-model="fullname" name="name" type="text" placeholder="Full Name" required class="border border-amber-400  placeholder:text-amber-800  p-2 rounded" />
      <input v-model="email" name="title" type="email" placeholder="Email" required class="border border-amber-400 p-2 placeholder:text-amber-800 rounded" />
      <textarea v-model="message" name="message" placeholder="Massage" required class="border border-amber-400 placeholder:text-amber-800 p-2 rounded"></textarea>
      <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-amber-50 p-2 cursor-pointer rounded">
        Send Message
      </button>
  </form>
  
  
      <p v-if="resultMessage" :class="resultSuccess ? 'text-green-600' : 'text-red-600'" class="mt-3">
        {{ resultMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import emailjs from '@emailjs/browser'

// فرم
const form = ref<HTMLFormElement | null>(null)
const fullname = ref('')
const email = ref('')
const message = ref('')
const resultMessage = ref('')
const resultSuccess = ref(true)
const config = useRuntimeConfig()
// اطلاعات تماس
const contacts = [
  { type: 'location', icon: 'tdesign:location', text: 'Tehran, Iran' },
  { type: 'email', icon: 'line-md:email', text: 'ashrfya628@gmail.com' },
  { type: 'number', icon: 'line-md:phone', text: '+98 901 681 2518' }
]
const SERVICE_ID = config.public.NUXT_EMAILJS_SERVICE_ID
const TEMPLATE_ID = config.public.NUXT_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = config.public.NUXT_EMAILJS_PUBLIC_KEY

// ارسال ایمیل
const sendEmail = () => {
  if (!form.value) return
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    resultMessage.value = '❌ EmailJS variables are not defined!'
    resultSuccess.value = false
    return
  }

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.value, PUBLIC_KEY)
  .then(
    (response) => {
      console.log(response.text)
      resultMessage.value = '✅ Email sent successfully!'
      resultSuccess.value = true
      fullname.value = ''
      email.value = ''
      message.value = ''
      form.value?.reset()
    },
    (error) => {
      console.log(error.text)
      resultMessage.value = '❌ Error sending email.'
      resultSuccess.value = false
    }
  )
}
</script>

<style scoped>
/* اختیاری: اضافه کردن استایل‌های بیشتر */
</style>
