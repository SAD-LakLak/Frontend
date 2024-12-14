<template xmlns="http://www.w3.org/1999/html">
  <div class="w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 h-full pt-8 pb-4">
    <!--    HEADER-->
    <Header/>
    <br/>
    <NuxtPage/>
    <br/>
    <Footer/>

  </div>
</template>
<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>