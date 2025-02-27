import React from "react";
import {Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

function DashboardMenu() {
    const auth = useAuth();
    const navigate = useNavigate()

    return (
        <div className={"flex w-1/4 flex-col gap-4 rounded-2xl bg-white items-center justify-between"}>
            <Link className={"hover:cursor-pointer w-1/2 mt-4"} to={"/"}>
                <img src={"/images/logo.png"} alt="logo"/>
            </Link>
            <div className={"flex flex-col gap-4 w-full items-center mb-16"}>
                <Button onClick={() => {
                    navigate("/dashboard")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">حساب کاربری</Button>
                <Button onClick={() => {
                    navigate("/packages")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">پکیج‌ها</Button>
                <Button disabled={true} onClick={() => {
                    navigate("/products/createProduct")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">سفارش‌ها</Button>
                <Button disabled={true} onClick={() => {
                    navigate("/orders")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">تاریخچه پرداخت‌ها</Button>
                <Button onClick={() => {
                    navigate("/tickets")
                }} className="rounded-full w-[80%] bg-primary font-IRANSansXDemiBold">پشتیبانی</Button>
            </div>
            <Button onClick={() => {
                auth.logout()
                navigate("/")
            }} className="rounded-full w-[80%] bg-accent font-IRANSansXDemiBold">خروج از حساب کاربری</Button>
            <p className={"font-IRANSansXDemiBold text-xs mb-4"}>© LakLak 2024</p>
        </div>

    );
}

export default DashboardMenu;
