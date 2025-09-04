<template>
  <div class="min-h-screen flex flex-col bg-amber-50 text-amber-950">
    <!-- هدر سایت -->
    <Header />

    <!-- محتوای صفحات -->
    <main class="flex-1 container mx-auto px-4 pt-[100px]">
      <NuxtPage />
    </main>

    <!-- فوتر سایت -->
    <Footer />
  </div>
</template>

<script setup>
// کامپوننت‌های مشترک
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style scoped>
/* استایل‌های کلی وبلاگ */
body {
  font-family: 'Inter', sans-serif;
}

</style>
