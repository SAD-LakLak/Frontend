import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import {Button} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import TicketRowCard from "./TicketRowCard.tsx";


export default function Tickets() {
    const {accessToken, logout} = useAuth();

    useEffect(() => {
        console.log(accessToken)
    }, []);

    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*right part*/}
            <DashboardMenu/>
            {/*left part*/}
            <div className={"flex w-4/5 flex-col gap-4 rounded-2xl bg-white py-8 px-8"}>
                <div className={"flex justify-between"}>
                    <p className={"font-IRANSansXBold text-3xl text-onBackground"}>تاریخچه‌ی تیکت‌ها</p>
                    <Button className={"bg-primary font-IRANSansXMedium px-12 rounded-full shadow-xl"}>ثبت تیکت
                        جدید</Button>
                </div>

                <div className={"flex flex-col w-full h-fit gap-4 overflow-y-scroll no-scrollbar"}>
                    <TicketRowCard state={"در حال رسیدگی"} date={"1403/11/24"} title={"تیکت تستی شماره 1"}/>
                    <TicketRowCard state={"در حال رسیدگی"} date={"1403/11/24"} title={"تیکت تستی شماره 1"}/>
                    <TicketRowCard state={"در حال رسیدگی"} date={"1403/11/24"} title={"تیکت تستی شماره 1"}/>
                    <TicketRowCard state={"در حال رسیدگی"} date={"1403/11/24"} title={"تیکت تستی شماره 1"}/>
                    <TicketRowCard state={"در حال رسیدگی"} date={"1403/11/24"} title={"تیکت تستی شماره 1"}/>
                </div>

            </div>
        </div>
    );

}

