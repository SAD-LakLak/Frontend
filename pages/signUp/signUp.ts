import axiosInstance from "~/axiosConfig";

interface ISignUpBody {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (
  signUpData: ISignUpBody,
  snackbarConfig: Ref<{
    showError: boolean;
    errorMessage: string;
    snackType: string;
  }>,
) => {
  const body = signUpData;
  const headers = {};
  axiosInstance
    .post("/register/", body, { headers })
    .then((res) => {
      snackbarConfig.value.snackType = "success";
      snackbarConfig.value.errorMessage = "ثبت‌نام با موفقیت انجام شد!";
      setTimeout(() => {
        const router = useRouter();
        router.push("/signIn");
      }, 1000);
    })
    .catch((err) => {
      snackbarConfig.value.snackType = "error";
      snackbarConfig.value.errorMessage =
        err.response.data.detail || "مشکلی پیش آمده است.";
    })
    .finally(() => {
      snackbarConfig.value.showError = true;
    });
};
