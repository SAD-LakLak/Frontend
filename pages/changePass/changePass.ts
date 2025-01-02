import axiosInstance from "~/axiosConfig";

interface IPassRecoveryBody {
  email: string;
}

export const changePass = async (
  recoveryData: IPassRecoveryBody,
  snackbarConfig: Ref<{
    showError: boolean;
    errorMessage: string;
    snackType: string;
  }>,
) => {
  const body = recoveryData;
  const headers = {};

  axiosInstance
    .post("/password-recovery/", body, { headers })
    .then(() => {
      snackbarConfig.value.snackType = "success";
      snackbarConfig.value.errorMessage = "لینک بازیابی رمز عبور با موفقیت ارسال شد!";
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
