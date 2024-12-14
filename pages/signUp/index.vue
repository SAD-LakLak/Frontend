<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import {ref, computed} from 'vue';
import {nameRules, passwordRules, phoneRules} from "~/constants/inputRules";
import {password} from "iron-webcrypto";

const phoneNumber = ref("");
const name = ref("");


const password = ref('');
const password2 = ref('');
const showPassword = ref(false);

const passwordRules = [
  (v: any) => !!v || 'رمز عبور الزامی است',
  (v: any) => v.length == 8 || 'رمز عبور باید 8 کاراکتر باشد'
];

const password2Rules = [
  (v: any) => !!v || 'تکرار رمز عبور الزامی است',
  (v: any) => v === password.value || 'رمز عبور و تکرار آن باید یکسان باشند'
];
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

</script>

<template>
  <div class="w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 h-full pt-8 pb-4">
    <Header/>
    <br/>

    <div class=" items-center justify-center flex rounded-2xl " style="position: relative">
      <div class="h-3/4  rounded-2xl flex shadow-2xl shadow-gray-800" style="position:absolute;">
        <!--        Pattern-->
        <img src="public/formPattern.png" class="rounded-tl-2xl rounded-bl-2xl">
        <!--        Form-->
        <div class="w-96 bg-primaryLight rounded-2xl flex-column justify-center align-top px-16 py-8 ">
          <p class="w-full mx-auto text-center font-IRANSansXBold text-3xl mb-8">ثبت‌ نام</p>
          <v-text-field
              base-color="primary"
              v-model="name"
              label="نام و نام خانوادگی"
              placeholder="نام خود را به فارسی وارد کنید."
              type="tel"
              color="primary"
              class="font-IRANSansXDemiBold mb-2"
              hide-details="auto"
              outlined
              :rules="nameRules"
          ></v-text-field>
          <v-text-field
              base-color="primary"
              v-model="phoneNumber"
              label="شماره تماس"
              placeholder="09193726908"
              type="tel"
              color="primary"
              class="font-IRANSansXDemiBold mb-2 "
              hide-details="auto"
              outlined
              :rules="phoneRules"
          ></v-text-field>
          <v-text-field
              v-model="password"
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              class="font-IRANSansXDemiBold"
              hide-details="auto"
              outlined
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePasswordVisibility"
              :rules="passwordRules"
          ></v-text-field>

          <v-text-field
              v-model="password2"
              label="تکرار رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              class="font-IRANSansXDemiBold mt-2"
              hide-details="auto"
              outlined
              :rules="password2Rules"
          ></v-text-field>
          <div class="w-full mx-auto justify-center mt-4 gap-5 flex">
            <button
                class="font-IRANSansXBold rounded-3xl  w-fit px-6 py-2 bg-primary ">
              ورود
            </button>
            <button
                class="font-IRANSansXBold rounded-3xl  w-fit px-4 border-2 py-2 text-primary border-primary ">
              ثبت‌نام
            </button>
          </div>

          <p
              class="font-IRANSansXDemiBold w-full text-center mt-16" dir="rtl">
            حساب کاربری دارید؟
            <NuxtLink to="/signIn"><u class=" hover:cursor-pointer">وارد شوید.</u></NuxtLink>
          </p>
        </div>
      </div>
      <img src="public/comingsoon.png" class="rounded-2xl h-3/5">


    </div>

    <br/>
    <Footer/>
  </div>
</template>

<style scoped>
.debug {
  border: 2px solid red;
}
</style>