<template>
<nav>
    <h1>
        Contact
    </h1>
    <p>We are a here to help.</p>
</nav>
<section id="section-left">
<h2>Contact Stablo</h2>
<p>Have something to say? We are here to help. Fill up the form or send email or call phone.</p>
<ul class="">
    <li v-for="contact in contacts" :key="contact.type" >
        <Icon :name="contact.icon" class=""/>
        <span>{{ contact.text }}</span>
    </li>
</ul>
</section>
<form @submit.prevent="submitForm" class="flex flex-col gap-4 max-w-md">
    <input v-model="fullname" type="text" placeholder="نام کامل" required class="border p-2 rounded" />
    <input v-model="email" type="email" placeholder="ایمیل" required class="border p-2 rounded" />
    <textarea v-model="message" placeholder="متن پیام" required class="border p-2 rounded"></textarea>
    <button type="submit" class="">Send Massage</button>
  </form>
</template>
<script setup>
import { ref } from 'vue';
const fullname = ref('')
const email = ref('')
const message = ref('')
const submitForm = async() =>{
    try{
        await $fetch('/api/contact',{
            method:'POST',
            body:{fullname:fullname.value,email:email.value,message:message.value}
        })
        alert('✅Massage Send')
        fullname.value=''
        email.value=''
        message.value=''
    }catch(error){
        alert('❌Eroor in Send Message')
        console.error(error)
    }
}
const contacts = [
    {
        type:'location',
        icon:'tdesign:location',
        text:'Tehran, Iran'
    },
    {
        type:'email',
        icon:'line-md:email',
        text:'ashrfya628@gmail.com',
    },
    {
        type:'number',
        icon:"line-md:phone",
        text:'+98 901 681 2518'
    }
]
</script>