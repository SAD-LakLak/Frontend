import React from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

function OrderSuccess() {
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url);
    };

    return (
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight h-auto justify-center relative">
            <Header/>

            {/* Center */}
            <div className="w-full flex justify-between bg-white rounded-2xl py-16 px-24 items-center">
                <div className="w-hug flex flex-col items-start gap-8 px-12">
                    <p className="w-full text-4xl font-IRANSansXDemiBold">{"سفارش شما با موفقیت ثبت شد!"}</p>
                    <div className="flex w-full justify-between">
                        <Button
                            onClick={() => handleNavigate("/orders")}
                            className="rounded-full text-base w-fit bg-primary font-IRANSansXDemiBold mt-4"
                        >
                            پیگیری سفارش
                        </Button>
                        <Button
                            onClick={() => handleNavigate("/")}
                            className="rounded-full text-base w-fit bg-primary font-IRANSansXDemiBold mt-4">
                            بازگشت به صفحه‌ی اصلی
                        </Button>
                    </div>
                </div>
                <div className="w-2/5 flex justify-start">
                    <img className="w-full" src="/images/stork.png" alt="Stork"/>
                </div>
            </div>

            <Footer/>
        </div>
    );

}

export default OrderSuccess;
