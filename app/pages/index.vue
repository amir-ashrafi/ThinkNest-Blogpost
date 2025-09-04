<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 px-4 pt-10"
  >
    <div
      v-for="data_post in data_posts"
      :key="data_post.id"
      class="flex flex-col text-left pb-0 gap-2 bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
      :class="data_post.id === 0 ? 'lg:col-span-2 xl:col-span-1  lg:row-span-1 md:col-span-2 md:row-span-1' : data_post.id === 1? 'xl:col-span-2 ':''"
    >
      <img
        :src="data_post.image_src"
        :alt="data_post.alt"
        class="w-full h-64 md:h-52 lg:h-60 rounded-t-xl object-cover"
        
      />
      <div class="px-4 py-3 flex flex-col">
        <span
          class="inline-block text-xs font-semibold tracking-wide uppercase text-amber-600"
        >
          {{ data_post.category }}
        </span>
        <h1
          class="text-lg lg:text-xl font-semibold mt-1 mb-2 leading-snug hover:text-amber-600  cursor-pointer"
        >
          {{ data_post.title }}
        </h1>
        <div class="flex items-center   gap-3 text-sm text-gray-600 mt-3">
          <img
            :src="data_post.image_profile"
            alt="Profile_Image"
            class="size-8 object-cover rounded-full"
          />
          <p class="font-medium">{{ data_post.profile_name }}</p>
          <span class="text-gray-400">· {{ data_post.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>



<script setup>
import { ref } from 'vue';

const data_posts = ref([
  {
    id: 0,
    image_src: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=800",
    alt: "Frontend trends 2025",
    category: "Technology",
    title: "10 Key Frontend Trends in 2025",
    image_profile: "https://i.pravatar.cc/100?img=12",
    profile_name: "John Smith",
    date: "2025-09-04"
  },
  {
    id: 1,
    image_src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    alt: "Minimal typography guide",
    category: "Design",
    title: "A Minimal Typography Guide for the Web",
    image_profile: "https://i.pravatar.cc/100?img=23",
    profile_name: "Emily Johnson",
    date: "2025-08-29"
  },
  {
    id: 2,
    image_src: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800",
    alt: "Home workout equipment",
    category: "Health & Fitness",
    title: "5 Tips for Choosing Home Workout Equipment",
    image_profile: "https://i.pravatar.cc/100?img=8",
    profile_name: "Michael Brown",
    date: "2025-08-20"
  },
  {
    id: 3,
    image_src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    alt: "Next.js and Prisma guide",
    category: "Programming",
    title: "Getting Started with Next.js and Prisma",
    image_profile: "https://i.pravatar.cc/100?img=32",
    profile_name: "Sarah Wilson",
    date: "2025-08-10"
  },
  {
    id: 4,
    image_src: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800",
    alt: "Online sports store",
    category: "Business",
    title: "How to Build an Online Sports Store",
    image_profile: "https://i.pravatar.cc/100?img=5",
    profile_name: "David Miller",
    date: "2025-07-31"
  },
  {
    id: 5,
    image_src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    alt: "Admin dashboard UI patterns",
    category: "UI/UX",
    title: "10 Useful Patterns for Admin Dashboards",
    image_profile: "https://i.pravatar.cc/100?img=47",
    profile_name: "Sophia Davis",
    date: "2025-07-18"
  }
]);
</script>

<style scoped>
/* optional custom styling */
</style>
