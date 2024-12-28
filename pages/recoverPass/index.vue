<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { ref } from "vue";
import { passwordRules, phoneRules } from "~/constants/inputRules";
import { password } from "iron-webcrypto";
import ErrorSnackbar from "~/components/ErrorSnackbar.vue";
import { signIn } from "~/pages/signIn/signIn";
import { hashPassword } from "~/utils/hashPassword";
import { replacePersianNumbers } from "~/utils/replacePersianNumbers";

const phoneNumber = ref("");

const password = ref("");
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const snackbarConfig = ref({
  showError: false,
  errorMessage: "",
  snackType: ""
});

async function handleRecovery() {
  const data = {
    email: replacePersianNumbers(email.value)
  };
  if (email.value) {
    console.log(true);
    await recoverPass(data, snackbarConfig);
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
      class="flex items-center justify-center h-full rounded-2xl"
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
        <!--        Form-->
        <div
          class="w-96 bg-primaryLight rounded-2xl flex-column justify-center align-top px-16 py-8"
        >
          <p
            class="w-full mx-auto text-center font-IRANSansXBold text-3xl mt-4 mb-16"
          >
            بازیابی رمز عبور
          </p>
          <p
            class="w-full mx-auto text-center font-IRANSansXDemiBold text-l mb-8" dir="rtl"
          >
          برای دریافت لینک بازیابی رمز عبور، شماره تماس خود را وارد کنید.
          </p>
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
            style="text-align: right"
          ></v-text-field>
          <div class="w-full mx-auto justify-center mt-8 gap-5 flex">
            <button
              @click="
                () => {
                  handleRecovery();
                }
              "
              class="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary"
            >
              دریافت لینک
            </button>
          </div>

          <p class="font-IRANSansXDemiBold w-full text-center mt-16" dir="rtl">
            <NuxtLink to="/signIn"
            ><u class="hover:cursor-pointer">بازگشت به صفحه‌ی ورود</u></NuxtLink
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