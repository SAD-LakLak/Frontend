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
import { nationCodeValidator } from "~/utils/nationalCodeValidator";
import { RoleEnum } from "~/pages/signUp/roles";

const snackbarConfig = ref({
  showError: false,
  errorMessage: "",
  snackType: ""
});

const formData = reactive({
  phone_number: "",
  first_name: "",
  email: "",
  username: "",
  national_code: "",
  password: "",
  password2: "",
  showPassword: false,
  role: "customer"
});


const showPassword = ref(false);

const password2Rules = [
  (v: any) => !!v || "تکرار رمز عبور الزامی است",
  (v: any) => v === formData.password || "رمز عبور و تکرار آن باید یکسان باشند"
];

const nationalCodeRules = [
  (v: any) => !!v || "کد ملی الزامی است",
  (v: any) => nationCodeValidator(v) || "کد ملی معتبر نیست"
];

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

async function handleSignUp() {
  if (formData.password === formData.password2 && formData.email && formData.phone_number) {

    const hashedPassword = await hashPassword(formData.password);
    formData.password = hashedPassword;

    formData.phone_number = replacePersianNumbers(formData.phone_number);
    formData.national_code = replacePersianNumbers(formData.national_code);
    formData.role = RoleEnum[2];

    await signUp(formData, snackbarConfig);
  } else {
  }
}
</script>


<template>
  <div
    class="w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 pt-8 pb-4"
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
        class=" h-[90%] rounded-2xl flex shadow-2xl shadow-gray-800"
        style="position: absolute"
      >
        <!--        Pattern-->
        <img
          src="public/formPattern.png"
          class="rounded-tl-2xl rounded-bl-2xl h-fill"
        />
        <!--        Form-->
        <div
          class="w-96 bg-primaryLight rounded-2xl flex-col py-4 justify-center align-top px-16 py-8 flex"
        >
          <p
            class="w-full mx-auto text-center font-IRANSansXBold text-3xl mb-4"
          >
            ثبت‌ نام
          </p>
          <v-text-field
            base-color="primary"
            v-model="formData.first_name"
            label="نام و نام خانوادگی"
            placeholder="نام کامل خود را وارد کنید."
            type="text"
            color="primary"
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            base-color="primary"
            v-model="formData.phone_number"
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
            v-model="formData.email"
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
            v-model="formData.username"
            label="نام کاربری"
            placeholder="example1234"
            type="text"
            color="primary"
            base-color="primary"
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="passwordRules"
          ></v-text-field>
          <v-text-field
            v-model="formData.national_code"
            label="کد ملی"
            placeholder="4409185731"
            type="phone_number"
            color="primary"
            base-color="primary"
            class="font-IRANSansXDemiBold"
            hide-details="auto"
            outlined
            :rules="nationalCodeRules"
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
          <v-text-field
            v-model="formData.password2"
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
              class="font-IRANSansXBold rounded-3xl mt-2 w-fit px-6 py-2 bg-primary"
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

