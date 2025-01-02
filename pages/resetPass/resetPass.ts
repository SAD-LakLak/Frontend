import axiosInstance from "~/axiosConfig";

interface IPassRecoveryBody {
  email: string;
}

export const resetPass = async (
  recoveryData: IPassRecoveryBody,
  snackbarConfig: Ref<{
    showError: boolean;
    errorMessage: string;
    snackType: string;
  }>
) => {
  const body = recoveryData;
  const headers = {};

  axiosInstance
    .post("/reset_password/", body, { headers })
    .then(() => {
      snackbarConfig.value.snackType = "success";
      snackbarConfig.value.errorMessage = "لینک بازیابی رمز عبور با موفقیت ارسال شد!";
      setTimeout(() => {
        const router = useRouter();
        router.push("/changePass");
      }, 1000);
    })
    .catch((err) => {
      snackbarConfig.value.snackType = "error";
      snackbarConfig.value.errorMessage =
        err.response?.data?.detail || "مشکلی پیش آمده است.";
    })
    .finally(() => {
      snackbarConfig.value.showError = true;
    });
};

export const validateResetToken = async (token: string) => {
  const router = useRouter();
  axiosInstance.get(`/reset_password/${token}`).then((res) => {
    if (res.data.tokenValidity) {
      router.push("/changePass?token=" + res.data.resetToken);
    }
  }).finally(() => {
    router.push("/resetPass");
  });
};