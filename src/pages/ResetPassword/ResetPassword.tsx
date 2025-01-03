import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { replacePersianNumbers } from "../../utils/replacePersianNumbers";
import { resetPass, validateResetToken } from "../../pages/resetPass/resetPass";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { NotifConfig, useAlertNotif } from "../../components/Alert";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { alertConfig, showNotification } = useAlertNotif();

    const [email, setEmail] = useState("");
    const [snackbarConfig, setSnackbarConfig] = useState<NotifConfig>({
        showError: false,
        errorMessage: "",
        snackType: "",
    });

    // Extract token from query parameters
    const queryParams = new URLSearchParams(location.search);
    const RESET_TOKEN = queryParams.get("token");

    useEffect(() => {
        if (RESET_TOKEN) {
            validateResetToken(RESET_TOKEN)
                .then(() => {
                    // Token validation successful
                })
                .catch((err) => {
                    setSnackbarConfig({
                        showError: true,
                        errorMessage: err.response?.data?.detail || "مشکلی پیش آمده است.",
                        snackType: "error",
                    });
                    showNotification({
                        ...snackbarConfig,
                        showError: true,
                    });
                });
        }
    }, [RESET_TOKEN]);

    const handleRecovery = async () => {
        if (email) {
            const data = {
                email: replacePersianNumbers(email),
            };
            await resetPass(data, showNotification);
        } else {
            setSnackbarConfig({
                showError: true,
                errorMessage: "لطفا ایمیل خود را وارد کنید",
                snackType: "error",
            });
            showNotification({
                ...snackbarConfig,
                showError: true,
            });
        }
    };

    return (
        <div className="w-full flex-col gap-24 px-2 lg:px-16 bg-blue-100 h-full pt-8 pb-4">
            <Header />
            <br />

            <div className="flex items-center justify-center h-full rounded-2xl" style={{ position: "relative" }}>
                <ErrorSnackbar
                    className="position-sticky"
                    type={snackbarConfig.snackType}
                    showError={snackbarConfig.showError}
                    errorMessage={snackbarConfig.errorMessage}
                />
                <div className="h-3/4 rounded-2xl flex shadow-2xl shadow-gray-800" style={{ position: "absolute" }}>
                    {/* Form */}
                    <div className="w-96 bg-primaryLight rounded-2xl flex-column justify-center align-top px-16 py-8">
                        <p className="w-full mx-auto text-center font-IRANSansXBold text-3xl mt-4 mb-16">بازیابی رمز عبور</p>
                        <p className="w-full mx-auto text-center font-IRANSansXDemiBold text-l mb-8" dir="rtl">
                            برای دریافت لینک بازیابی رمز عبور، ایمیل خود را وارد کنید.
                        </p>

                        <div className="w-full">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                type="email"
                                className="font-IRANSansXDemiBold text-right w-full p-2 mb-4 rounded-lg border border-gray-300"
                                style={{ textAlign: "right" }}
                            />
                        </div>

                        <div className="w-full mx-auto justify-center mt-8 gap-5 flex">
                            <button
                                onClick={handleRecovery}
                                className="font-IRANSansXBold rounded-3xl w-fit px-6 py-2 bg-primary text-white"
                            >
                                دریافت لینک
                            </button>
                        </div>

                        <p className="font-IRANSansXDemiBold w-full text-center mt-16" dir="rtl">
                            <a href="/signIn" className="hover:cursor-pointer hover:underline">
                                بازگشت به صفحه‌ی ورود
                            </a>
                        </p>
                    </div>
                </div>
                <img src="public/comingsoon.png" className="rounded-2xl h-3/5" />
            </div>

            <br />
            <Footer />
        </div>
    );
};

export default ResetPassword;
