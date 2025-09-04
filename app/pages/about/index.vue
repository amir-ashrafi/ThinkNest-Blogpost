<template>
    <header class="container justify-center items-center  flex flex-col gap-4 md:mt-5">
        <div class="title_header">
         <h1 class="">About</h1>   
         <p>We are a small passionate team.</p>
        </div>
        <div class="flex gap-5 sm:gap-9 py-4 md:py-9 shadow-amber-50 shadow-2xs bg-amber-900/5 justify-around w-full">
            <img
                v-for="image in imageData"
                :key="image.id"
                :src="image.src"
                class="w-24  h-28 sm:w-40 sm:h-44   object-cover md:w-44 md:h-48 lg:w-52 lg:h-56 rounded-xl"
                :class="{ 'translate-y-[-30px]': image.id === 1 }" 
                :alt="image.alt"
            />
        </div>
        <div class="flex  flex-col gap-8 mt-4 w-full max-w-[500px] lg:text-lg lg:max-w-[600px] text-center">

            <div class="flex flex-col justify-center items-center gap-6 mx-5 mb-4">
                <p>
                    We provide real-time connectivity to enable software providers and financial institutions to build integrated products for their small business customers.
                </p>
                <p>
                    Our API infrastructure is leverged by clients ranging from lenders to corporate card providers and business forecasting tools, with use cases including automatic reconciliation, business dashboarding, and loan decisioning.
                </p>
                <NuxtLink
                class="button_global max-w-[500px] sm:max-w-[200px]"
                 to="/contact">
                    Get in touch
                </NuxtLink>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref } from 'vue';

const imageData = ref([
    {
        id:0 , 
        src:'/about/elina.webp',
        alt:'Author'
    },
    {
        id:1 , 
        src:'/about/json.avif',
        alt:'Team'
    },
    {
        id:3 , 
        src:'/about/mohamad.avif',
        alt:'Community'
    },
])
</script>