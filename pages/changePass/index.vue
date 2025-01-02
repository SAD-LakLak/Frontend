<script setup lang="ts">
import { ref } from "vue";
import { passwordRules } from "~/constants/inputRules";
import { password } from "iron-webcrypto";
import ErrorSnackbar from "~/components/ErrorSnackbar.vue";
import { replacePersianNumbers } from "~/utils/replacePersianNumbers";
import { changePass } from "~/pages/changePass/changePass";


const route = useRoute();
const RESET_TOKEN = route.query.token;

if (!RESET_TOKEN) {
  const router = useRouter();
  router.push("/resetPass");
}

const password = ref("");
const password2 = ref("");
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const password2Rules = [
  (v: any) => !!v || "تکرار رمز عبور الزامی است",
  (v: any) => v === password.value || "رمز عبور و تکرار آن باید یکسان باشند"
];

const snackbarConfig = ref({
  showError: false,
  errorMessage: "",
  snackType: ""
});

async function handlePassChange() {
  const header = {
    token: RESET_TOKEN as string
  };
  const data = {
    newPassword: replacePersianNumbers(password.value)
  };
  if (password.value === password2.value) {
    await changePass(data, header, snackbarConfig);
  } else {
    console.log(false);
  }
}
</script>

<template>
  <div
    class="h-screen w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 pt-8 pb-4"
  >
    <div
      class=" h-full flex items-center justify-center rounded-2xl"
      style="position: relative"
    >
      <ErrorSnackbar
        class="position-sticky"
        :type="snackbarConfig.snackType"
        v-model="snackbarConfig.showError"
        :errorMessage="snackbarConfig.errorMessage"
      />
      <div
        class=" h-fit rounded-2xl flex shadow-2xl shadow-gray-800"
        style="position: absolute"
      >
        <!--        Form-->


        <div
          class=" w-96 bg-white rounded-2xl flex-column justify-center align-top px-16 py-2"
        >

          <div class="flex flex-1 justify-center items-center h-25">
            <NuxtLink to="/" class="h-full">
              <img src="public/logo/mainLogo.svg" class="h-full" @click="()=>{
             const router  =   useRouter()
             router.push('/');
              }" />
            </NuxtLink>
          </div>

          <p
            class="w-full mx-auto text-center font-IRANSansXBold text-3xl my-2"
          >
            تغییر رمز عبور
          </p>

          <p
            class="w-full mx-auto text-center font-IRANSansXDemiBold text-l my-4" dir="rtl"
          >
            رمز عبور جدید خود را وارد کنید.
          </p>

          <v-text-field
            v-model="password"
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            :type="showPassword ? 'text' : 'password'"
            color="primary"
            class="font-IRANSansXDemiBold mb-4"
            hide-details="auto"
            outlined
            :rules="passwordRules"
          >
            <template #append-inner>
              <v-icon
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              >
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>

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

          <div class="w-full mx-auto justify-center mt-4 gap-5 flex">
            <button
              @click="
                () => {
                  handlePassChange();
                }
              "
              class="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary mb-2"
            >
              تغییر رمز عبور
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
.debug {
  border: 2px solid red;
}
</style>