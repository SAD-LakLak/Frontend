<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { ref, computed } from "vue";
import {
  emailRules,
  nameRules,
  passwordRules,
  phoneRules
} from "~/constants/inputRules";
import { password } from "iron-webcrypto";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import { signUp } from "~/pages/signUp/signUp";
import { hashPassword } from "~/utils/hashPassword";
import { replacePersianNumbers } from "~/utils/replacePersianNumbers";

const snackbarConfig = ref({
  showError: false,
  errorMessage: "",
  snackType: ""
});

const phoneNumber = ref("");
const name = ref("");
const email = ref("");

const password = ref("");
const password2 = ref("");
const showPassword = ref(false);

const password2Rules = [
  (v: any) => !!v || "تکرار رمز عبور الزامی است",
  (v: any) => v === password.value || "رمز عبور و تکرار آن باید یکسان باشند"
];
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

async function handleSignUp() {
  const data = {
    username: replacePersianNumbers(phoneNumber.value),
    email: replacePersianNumbers(email.value),
    password: replacePersianNumbers(password.value)
  };
  if (password.value === password2.value && email.value && phoneNumber.value) {
    console.log(true);
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;
    await signUp(data, snackbarConfig);
  } else {
    console.log(false);
  }
}
</script>

<template>
  <div
    class="w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 h-full pt-8 pb-4"
  >
    <Header />
    <br />

    <div
      class="items-center justify-center flex rounded-2xl"
      style="position: relative"
    >
      <ErrorSnackbar
        class="position-sticky"
        :type="snackbarConfig.snackType"
        v-model="snackbarConfig.showError"
        :errorMessage="snackbarConfig.errorMessage"
      />
      <div
        class="h-3/4 rounded-2xl flex shadow-2xl shadow-gray-800"
        style="position: absolute"
      >
        <!--        Pattern-->
        <img
          src="public/formPattern.png"
          class="rounded-tl-2xl rounded-bl-2xl"
        />
        <!--        Form-->
        <div
          class="w-96 bg-primaryLight rounded-2xl flex-col py-4 justify-center align-top px-16 py-8 h-full flex"
        >
          <p
            class="w-full mx-auto text-center font-IRANSansXBold text-3xl mb-4"
          >
            ثبت‌ نام
          </p>
          <v-text-field
            base-color="primary"
            v-model="name"
            label="نام و نام خانوادگی"
            placeholder="نام خود را به فارسی وارد کنید."
            type="tel"
            color="primary"
            class="font-IRANSansXDemiBold"
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
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="phoneRules"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="ایمیل"
            placeholder="example@gmail.com"
            type="email"
            color="primary"
            base-color="primary"
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="emailRules"
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
            type="password"
            color="primary"
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="password2Rules"
          ></v-text-field>
          <div class="w-full mx-auto justify-center gap-5 flex">
            <button
              @click="
                () => {
                  handleSignUp();
                }
              "
              class="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary"
            >
              ثبت‌نام
            </button>
          </div>

          <p class="font-IRANSansXDemiBold w-full mt-4 text-center" dir="rtl">
            حساب کاربری دارید؟
            <NuxtLink to="/signIn"
            ><u class="hover:cursor-pointer">وارد شوید.</u></NuxtLink
            >
          </p>
        </div>
      </div>
      <img src="public/comingsoon.png" class="rounded-2xl h-3/5" />
    </div>

    <br />
    <Footer />
  </div>
</template>

<style scoped>
.debug {
  border: 2px solid red;
}
</style>
