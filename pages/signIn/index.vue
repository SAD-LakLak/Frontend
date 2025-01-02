<script setup lang="ts">
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { ref } from "vue";
import { passwordRules, phoneRules } from "~/constants/inputRules";
import type { password } from "iron-webcrypto";
import ErrorSnackbar from "~/components/ErrorSnackbar.vue";
import { signIn } from "~/pages/signIn/signIn";
import { hashPassword } from "~/utils/hashPassword";
import { replacePersianNumbers } from "~/utils/replacePersianNumbers";


const formData = reactive({
  username: "",
  password: ""
});


const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const snackbarConfig = ref({
  showError: false,
  errorMessage: "",
  snackType: ""
});

async function handleSignIn() {
  formData.username = replacePersianNumbers(formData.username);
  formData.password = replacePersianNumbers(formData.password);
  if (formData.username && formData.password) {
    await signIn(formData, snackbarConfig);
  } else {
    snackbarConfig.value.showError = true;
    snackbarConfig.value.errorMessage = "لطفا تمامی فیلد‌ها را پر کنید.";
    snackbarConfig.value.snackType = "error";
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
          class="w-96 bg-primaryLight rounded-2xl flex-column justify-center align-top px-16 py-8"
        >
          <p
            class="w-full mx-auto text-center font-IRANSansXBold text-3xl mb-8"
          >
            ورود
          </p>
          <v-text-field
            base-color="primary"
            v-model="formData.username"
            label="نام کاربری"
            placeholder="09193726908"
            type="text"
            color="primary"
            class="font-IRANSansXDemiBold mb-2"
            hide-details="auto"
            outlined
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            v-model="formData.password"
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
          <div class="w-full mx-auto justify-center mt-4 gap-5 flex">
            <button
              @click="
                () => {
                  handleSignIn();
                }
              "
              class="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary"
            >
              ورود
            </button>
          </div>
          <p
            class="font-IRANSansXDemiBold w-full text-center mt-6 hover:cursor-pointer"
            dir="rtl"
          >
            <NuxtLink to="/resetPass"
            ><u class="hover:cursor-pointer"
            >رمز عبور خود را فراموش کرده‌ام.</u
            >
            </NuxtLink>
          </p>

          <p class="font-IRANSansXDemiBold w-full text-center mt-16" dir="rtl">
            حساب کاربری ندارید؟
            <NuxtLink to="/signUp"
            ><u class="hover:cursor-pointer">ثبت نام کنید.</u></NuxtLink
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
