import {useNavigate} from "react-router-dom";
import axiosInstance from "../../constants/axiosConfig.ts";
import {NotifConfig} from "../../components/Alert.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

interface ISignInBody {
    username: string;
    password: string;
}


export const signIn = async (
    signInData: ISignInBody,
    showNotification: (config: NotifConfig) => void,
) => {
    const body = signInData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "success", text: "ورود با موفقیت انجام شد!", show: true
    };
    axiosInstance
        .post("/api/token/", body)
        .then((res) => {
            notifConfig.notifType = "success";
            notifConfig.text = "ورود با موفقیت انجام شد!";
            const {login} = useAuth()
            login({accessToken: res.data.access, refreshToken: res.data.refresh})
        })
        .catch((err) => {
            notifConfig.notifType = "error";
            notifConfig.text = err.response.data.detail || "مشکلی پیش آمده است.";
        })
        .finally(() => {
            showNotification(notifConfig);
        });
};
