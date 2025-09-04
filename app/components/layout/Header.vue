<template>
  <header
    class="w-full fixed top-0 sm:px-10 left-0 items-baseline z-50 px-6 lg:px-8 rounded-b-lg lg:justify-center xl:px-[8%] text-amber-900 py-6 flex justify-between transition-all duration-300 bg-amber-50"
    :class="isScroll ? 'bg-amber-100/50 bg-opacity-50 backdrop-blur-lg shadow-sm' : ''"
  >
    <!-- لوگو -->
    <NuxtLink href="/" class="text-4xl text-amber-900 md:text-3xl md:hidden dancing-script">
      ThinkNest
    </NuxtLink>
    <!-- دکمه منو دستکاپ -->
    <nav
    class="hidden w-full md:flex max-w-[1300px]  justify-around"
    >
    <ul class="flex md:items-center">
      <li v-for="(item,index) in munuItems" :key="index" class="mx-2 duration-100 transition-normal"  :class="activeItem == item.link?'font-bold border-b-2 py-3':'hover:border-b-2 py-3'" >
        <NuxtLink :to="item.link" :class="activeItem == item.link?'font-bold':'font-normal'" class=" button_menu" 
        @click.prevent="handleMenuClick(item.link)">
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
    
    <!-- لوگو در وسط (فقط دسکتاپ) -->
    <NuxtLink class="hidden text-3xl text-amber-900 md:text-5xl md:block dancing-script cursor-pointer">
      ThinkNest
    </NuxtLink>
    
    <!-- بخش کتگوری -->
    <div class="my-4 md:my-0 flex items-center">
      <NuxtLink v-if="author" to="/new-post" class="hover:underline button_menu">
        New Post
      </NuxtLink>
      <div v-else>
        <button class="flex items-center gap-1 cursor-pointer button_menu hover:border-b-2 transition-transform duration-300 border-amber-900" @click="toggleCategories" >
          Categories
          <span v-if="showCategories">▲</span>
          <span v-else>▼</span>
        </button>
      </div>
      
      <ul v-if="showCategories" class="flex top-[70px] -translate-x-10 border-b-2 rounded-b-lg border-amber-800 gap-0 w-40 h-[245px] text-center
       fixed flex-col bg-amber-100/50 p-3  z-10">
        <li v-for="(categori,index) in categories" :key="index" class="border-b-2 pb-3 pt-2 border-white hover:border-amber-900/50 transition w-full " >
          <NuxtLink :to="`/${categori.value}`" class="">
            {{ categori.name }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center hover:border-b-2 border-amber-900">
        <NuxtLink v-if="!user" to="/login" class=" button_menu">
          Login / sign in
        </NuxtLink>
        <NuxtLink v-else to="/profile" class="">
          Profile
        </NuxtLink>
      </div>
    </div>
    
    <!-- پروفایل / لاگین -->
  </nav>
  <button
    class="md:hidden text-3xl text-amber-950 cursor-pointer"
    @click="toggleMenu"
  >
    ☰
  </button>
    <!-- دکمه منوی موبایل -->
<div class="fixed  md:hidden min-h-screen w-full top-0 left-0 bg-amber-100/50 transition-transform duration-500
" :class="showMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'">

  <nav
    class="fixed  top-0 min-h-screen  left-0 w-64 sm:w-80   bg-amber-100 text-amber-900  shadow-md  p-6  "
  >
    <div class="absolute right-4 top-4 md:hidden cursor-pointer bg-amber-200 px-3 font-bold py-1 rounded-md" @click="toggleMenu">
      ✕
    </div>
    <ul class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-10 md:mt-0">
      <li v-for="(item,index) in munuItems" :key="index">
        <NuxtLink :to="item.link" class="hover:underline font-medium " @click.prevent="handleMenuClick(item.link)">
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>


    <!-- بخش کتگوری -->
    <div class="my-4 md:my-0">
      <NuxtLink v-if="author" to="/new-post" class="cursor-pointer">
        New Post
      </NuxtLink>
      <div v-else>
        <button class="flex  items-center gap-1 cursor-pointer font-medium" @click="toggleCategories" >
          Categories
          <span v-if="showCategories">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <ul v-if="showCategories" class="pl-4 mt-2 space-y-1 font-normal">
        <li v-for="(categori,index) in categories" :key="index">
          <NuxtLink :to="`/${categori.value}`" class="hover:underline">
            {{ categori.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- پروفایل / لاگین -->
    <div>
      <NuxtLink v-if="!user" to="/login" class="font-medium">
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
import { useRoute } from 'vue-router'
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
const activeItem =ref(useRoute().path)
const setActive = (link) =>{
  activeItem.value = link
}
const handleMenuClick = (link) => {
  if(!isDesktop.value){
    showMenu.value = false
  }
  setActive(link)
}
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

 <style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
.dancing-script {
  font-family: "Dancing Script", cursive;
}
.button_menu{
padding: 10px 0px;
margin: 0px 10px;
font-size: 18px;



}

</style>

