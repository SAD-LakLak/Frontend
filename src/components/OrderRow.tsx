import {Button} from "@material-tailwind/react";
import React from "react";
import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";
import {Order, getOrderStatus} from "../types/Order.ts";


export default function OrderRow({order}: { order: Order }) {
    return (
        <div key={order.id}
             className={"flex border-gray-200 border-2 w-full h-16 rounded-2xl py-4 px-6 justify-between items-center"}>
            <p className={"font-IRANSansXDemiBold text-onBackground opacity-80 flex-grow "}>{"سفارش " + replaceEnglishDigits(order.id) + "#"}</p>
            <div className={"flex gap-28"}>
                <p className={"font-IRANSansXRegular flex items-center w-20  text-onBackground opacity-80"}>{replaceEnglishDigits(order.order_date.split("T")[0])}</p>
                <div className={"py-2 px-4 w-32 justify-center text-center flex items-center rounded-3xl bg-accentBlue"}>
                    <p className={"font-IRANSansXRegular text-white"}>{replaceEnglishDigits(getOrderStatus(order.order_status))}</p>
                </div>
            </div>
        </div>
    )
}