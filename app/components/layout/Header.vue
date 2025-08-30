<template>
  <header
    class="w-full fixed top-0 left-0 z-50 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between transition-all duration-300"
    :class="isScroll ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-gray-900/70' : ''"
  >
    <!-- لوگو -->
    <NuxtLink href="/" class="text-2xl md:text-3xl dancing-script">
      ThinkNest
    </NuxtLink>

    <!-- دکمه منوی موبایل -->
    <button
      class="md:hidden text-2xl cursor-pointer"
      @click="toggleMenu"
    >
      ☰
    </button>
    <!-- منو -->ds
     <div class="w-full min-h-screen backdrop-blur-lg top-0 left-0 transition-transform duration-500  fixed " :class="showMenu ? 'translate-x-0' : 'translate-x-full md:translate-x-0'">

       <nav
         class="absolute blur-none bg-blue-200 text-blue-900  bg-whi z-50 top-0 min-h-screen md:static right-0 w-64 md:w-auto md:bg-transparent shadow-md md:shadow-none p-6 md:p-0"
       >
         <div class="absolute right-5 bg-blue-300 text-blue-700 px-2 py-1 rounded-sm top-4 md:hidden cursor-pointer" @click="toggleMenu">
           ✕
         </div>
   
         <ul class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-10 md:mt-0">
           <li v-for="(item,index) in munuItems" :key="index">
             <NuxtLink :to="item.link" class="hover:underline font-medium">
               {{ item.name }}
             </NuxtLink>
           </li>
         </ul>
   
         <!-- لوگو در وسط (فقط دسکتاپ) -->
         <NuxtLink class="hidden md:block mx-6 dancing-script text-xl">
           ThinkNest
         </NuxtLink>
   
         <!-- بخش کتگوری -->
         <div class="my-4 md:my-0">
           <NuxtLink v-if="author" to="/new-post" class="hover:underline">
             New Post
           </NuxtLink>
           <div v-else>
             <button @click="toggleCategories" class="flex items-center gap-1">
               Categories
               <span v-if="showCategories">▲</span>
               <span v-else>▼</span>
             </button>
           </div>
   
           <ul v-if="showCategories" class="pl-4 mt-2 space-y-1">
             <li v-for="(categori,index) in categories" :key="index">
               <NuxtLink :to="`/${categori.value}`" class="hover:underline">
                 {{ categori.name }}
               </NuxtLink>
             </li>
           </ul>
         </div>
   
         <!-- پروفایل / لاگین -->
         <div>
           <NuxtLink v-if="!user" to="/login" class="hover:underline">
             Login
           </NuxtLink>
           <NuxtLink v-else to="/profile" class="hover:underline">
             Profile
           </NuxtLink>
         </div>
       </nav>
     </div>
  </header>
</template>

<script setup>
import { NuxtLink } from '#components'
import { ref, onMounted, onUnmounted } from 'vue'

const munuItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' }
]

const categories = ref([
  { name: 'Technology', value: 'technology' },
  { name: 'Lifestyle', value: 'lifestyle' },
  { name: 'Education', value: 'education' },
  { name: 'Sports', value: 'sports' },
  { name: 'Health', value: 'health' }
])

const showCategories = ref(false)
const toggleCategories = () => {
  showCategories.value = !showCategories.value
}

const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const isDesktop = ref(false)
const checkScreen = () => {
  isDesktop.value = window.innerWidth >= 768
}

const isScroll = ref(false)

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
  window.addEventListener('scroll', () => {
    isScroll.value = window.scrollY > 50
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
.dancing-script {
  font-family: "Dancing Script", cursive;
}
</style>
