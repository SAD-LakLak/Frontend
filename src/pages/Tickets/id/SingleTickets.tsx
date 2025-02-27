import {useAuth} from "../../../context/AuthContext.tsx";
import React, {useEffect, useState} from "react";
import DashboardMenu from "../../../components/DashboardMenu.tsx";
import {Ticket} from "../../../types/Ticket.ts";
import {Button} from "@material-tailwind/react";
import {replaceEnglishDigits} from "../../../utils/replacePersianNumbers.ts";
import {fetchAllTickets, fetchSingleTicket} from "../tickets.ts";
import {Link, useParams} from "react-router-dom";


export default function SingleTicket() {
    const {accessToken} = useAuth();
    const [ticket, setTicket] = useState<Ticket>({} as Ticket);
    const {id} = useParams()
    useEffect(() => {
        const getTicket = async () => {
            fetchSingleTicket(accessToken as string, id as string).then((data) => {
                setTicket(data)
            });
        };
        getTicket();
    }, [accessToken]);


    return (
        <div className={"bg-primaryLight min-h-screens h-screen w-full py-8 px-16 flex gap-8"}>
            {/*right part*/}
            <DashboardMenu/>
            {/*left part*/}
            <div className={"flex w-4/5 flex-col gap-4 rounded-2xl bg-white py-8 px-8"}>
                <p className={"font-IRANSansXBold text-onBackground text-2xl"}>{replaceEnglishDigits(ticket.title)}</p>
                <div className={"flex w-full justify-end gap-2 items-center mt-4"}>
                    <Button disabled={true}
                            className={"bg-accent py-2 text-center flex items-center font-IRANSansXRegular rounded-2xl"}>{replaceEnglishDigits(ticket.category)}</Button>
                    <Button disabled={true}
                            className={"bg-primary py-2 text-center flex items-center font-IRANSansXRegular rounded-2xl"}>{replaceEnglishDigits(ticket.status)}</Button>
                </div>
                <div className={"flex w-full flex-col justify-start gap-4 mt-8 items-start"}>
                    <p className={"font-IRANSansXBold text-2xl"}>{"توضیحات"}</p>
                    <p className={"font-IRANSansXMedium text-md"}>{replaceEnglishDigits(ticket.message)}</p>
                </div>
                <div className={"flex w-full flex-col justify-start gap-4 mt-8 items-start"}>
                    <p className={"font-IRANSansXBold text-2xl"}>{"پاسخ پشتیبانی"}</p>
                    <p className={"font-IRANSansXMedium text-md"}>{ticket.response ? replaceEnglishDigits(ticket.response) : "تیکت شما در حال رسیدگی است..."}</p>
                </div>
                <Link to={"/tickets"}>
                    <Button
                        className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4">
                        بازگشت به لیست تیکت‌ها
                    </Button>
                </Link>
            </div>
        </div>
    );

}

