import React from "react";
import {Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

function DashboardMenu() {
    const auth = useAuth();
    const navigate = useNavigate()

    return (
        <div className={"flex w-[304px] h-fit flex-col gap-4 rounded-2xl bg-white items-center justify-start py-8"}>
            <div className={"flex flex-col gap-4 w-full items-center"}>
                <Button onClick={() => {
                    navigate("/dashboard")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">حساب کاربری</Button>
                <Button onClick={() => {
                    navigate("/orders")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">سفارش‌ها</Button>
                <Button onClick={() => {
                    navigate("/tickets")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">تیکت‌ها</Button>
            </div>
            <Button onClick={() => {
                auth.logout()
                navigate("/")
            }} className="rounded-full w-[80%] bg-accent font-IRANSansXDemiBold">خروج از حساب کاربری</Button>
        </div>

    );
}

export default DashboardMenu;
