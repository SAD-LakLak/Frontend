import axiosInstance from "~/axiosConfig";

interface ISignInBody {
    "username": string,
    "password": string
}

interface ISignInHeaders {

}


export const signIn = async (signInData: ISignInBody, snackbarConfig: Ref<{
    showError: boolean;
    errorMessage: string;
    snackType: string
}>) => {
    const body = signInData;
    const headers = {};
    axiosInstance.post('/login/', body, {headers})
        .then((res) => {
            snackbarConfig.value.snackType = 'success';
            snackbarConfig.value.errorMessage = 'ورود با موفقیت انجام شد!';
            localStorage.setItem("auth.access", res.data.access);
            localStorage.setItem("auth.refresh", res.data.refresh);
            setTimeout(() => {
                const router = useRouter();
                router.push("/profile")
            }, 1000)
        })
        .catch((err) => {
                snackbarConfig.value.snackType = 'error';
                snackbarConfig.value.errorMessage = err.response?.data?.message || 'مشکلی پیش آمده است.';
            }
        )
        .finally(() => {
            snackbarConfig.value.showError = true;

        });
};
