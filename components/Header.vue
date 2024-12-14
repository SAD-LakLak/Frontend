<script setup lang="ts">
const goToHome = () => {
  window.history.pushState({}, '', '/'); // تغییر آدرس به صفحه اصلی بدون ریلود
};
</script>

<template>
  <div
      class="flex justify-space-between items-center h-20 rounded-3xl bg-white px-4  shadow-gray-100 shadow-2xl">
    <div class="flex flex-1 justify-start items-center h-full ">
      <v-btn prepend-icon="mdi-cart-outline" variant="plain" v-ripple="false" color="primary" active-color="white"
             size="large"
             to="/shop"
             class="font-IRANSansXBold tracking-normal">فروشگاه
      </v-btn>
      <v-btn prepend-icon="mdi-account-circle-outline" variant="plain" v-ripple="false" color="primary" size="large"
             to="/signIn"
             class="font-IRANSansXBold tracking-normal ">ورود/ثبت‌نام
      </v-btn>
    </div>

    <div class="flex flex-1 justify-center items-center h-full">
      <NuxtLink to="/" class="h-full">
        <img src="public/logo/mainLogo.svg" class="h-full" @click="goToHome">
      </NuxtLink>
    </div>

    <div class="flex flex-1 justify-end items-center">
      <v-btn variant="plain" color="primary" size="large" v-ripple="false"
             to="/shop"
             class="font-IRANSansXDemiBold">
        بسته‌ها
      </v-btn>
      <v-btn variant="plain" color="primary" size="large" v-ripple="false"
             to="/shop"
             class="font-IRANSansXDemiBold">
        طرح‌ها
      </v-btn>

    </div>
  </div>
</template>

<style scoped>

</style>