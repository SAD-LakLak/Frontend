import axiosInstance from "~/axiosConfig";

interface IPassRecoveryBody {
  newPassword: string;
}

interface IPassRecoveryHeader {
  token: string;
}

export const changePass = async (
  recoveryData: IPassRecoveryBody,
  recoveryHeader: IPassRecoveryHeader,
  snackbarConfig: Ref<{
    showError: boolean;
    errorMessage: string;
    snackType: string;
  }>
) => {
  const body = recoveryData;
  const { token } = recoveryHeader;
  const headers = {};
  axiosInstance
    .post(`/reset_password/${token}`, body, { headers })
    .then(() => {
      snackbarConfig.value.snackType = "success";
      snackbarConfig.value.errorMessage = "رمز عبور با موفقیت تغییر کرد!";
      setTimeout(() => {
        const router = useRouter();
        router.push("/signIn");
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
