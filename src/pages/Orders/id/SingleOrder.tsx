import DashboardMenu from "../../../components/DashboardMenu.tsx";
import {getOrderStatus, Order, OrderItem} from "../../../types/Order.ts";
import {Button} from "@material-tailwind/react";
import {replaceEnglishDigits} from "../../../utils/replacePersianNumbers.ts";
import {Link} from "react-router-dom";
import Footer from "../../../components/Home/Footer.tsx";
import Header from "../../../components/Home/Header.tsx";
import {formatPrice} from "../../../utils/formatPrice.ts";
import { useLocation } from "react-router-dom";
import React from "react";


export default function SingleOrder() {
    const location = useLocation();
    const {order} = location.state as { order: Order };

    const total_cost = order.packages.reduce((total, pkg) => total + pkg.total_price, 0);
    const total_discount = Number(total_cost) * (Number(order.discount_amount || 0) / 100);
    const total_paid = Number(total_cost) - Number(total_discount) + Number(order.shipping_fee || 0);

    return (
        <div className={"bg-primaryLight min-h-screens h-fit w-full py-8 px-16 flex flex-col gap-8"}>
            <Header/>
            <div className={"flex gap-8"}>
                {/*right part*/}
                <DashboardMenu/>
                {/*left part*/}
                <div className={"flex w-full flex-col gap-8 rounded-2xl bg-white py-8 px-8"}>
                    <div className={"flex w-full justify-between gap-2 items-center mb-2"}>
                        <p className={"font-IRANSansXDemiBold text-onBackground text-2xl"}>{"سفارش " + replaceEnglishDigits(order.id) + "#"}</p>
                        <div className={"py-2 px-4 w-32 justify-center text-center flex items-center rounded-3xl bg-accentBlue"}>
                            <p className={"font-IRANSansXRegular text-[14px] text-white"}>{replaceEnglishDigits(getOrderStatus(order.order_status))}</p>
                        </div>
                    </div>
                    <div className={"flex justify-between gap-32"}>
                        <div className={"flex flex-col w-1/2 gap-4"}>
                            <div className={"flex w-full justify-between mb-2"}>
                                <p className={"font-IRANSansXMedium"}>{"تاریخ ثبت: "}</p>
                                <p>{replaceEnglishDigits(order.order_date.split("T")[0])}</p>
                            </div>

                            <div className={"flex w-full justify-between mb-2"}>
                                <p className={"font-IRANSansXMedium"}>{"مجموع هزینه‌ی کالاها: "}</p>
                                <p>{formatPrice(total_cost) + " تومان"}</p>
                            </div>

                            <div className={"flex w-full justify-between mb-2"}>
                                <p className={"font-IRANSansXMedium"}>{"مجموع تخفیف: "}</p>
                                <p>{formatPrice(total_discount) + " تومان"}</p>
                            </div>

                            <div className={"flex w-full justify-between mb-2"}>
                                <p className={"font-IRANSansXMedium"}>{"مبلغ پرداخت‌شده: "}</p>
                                <p>{formatPrice(total_paid) + " تومان"}</p>
                            </div>
                        </div>
                        <div className={"flex flex-col w-full gap-4"}>
                            <p className={"font-IRANSansXMedium"}>{"اقلام سفارش: "}</p>
                            <div className="flex flex-col gap-4">
                                {order.packages.map((pkg) => (
                                    <div
                                    key={pkg.package}
                                    className="flex border-gray-200 border-2 w-full h-16 rounded-2xl py-4 px-6 justify-between items-center gap-16"
                                >
                                        <p className="w-fit font-IRANSansXMedium text-[14px] text-onBackground opacity-80 flex-grow">
                                            {replaceEnglishDigits(pkg.package_name)}
                                        </p>
                                        <p className="w-fit text-[14px] flex items-center w-20 text-onBackground opacity-80">
                                            {"x" + replaceEnglishDigits(pkg.amount)}
                                        </p>
                                        <Button
                                            className="rounded-full w-fit bg-accent font-IRANSansXMedium"
                                        >
                                            ثبت نظر
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <Link to={"/orders"}>
                            <Button
                                className="rounded-full w-fit bg-primary font-IRANSansXDemiBold">
                                بازگشت به لیست سفارش‌ها
                            </Button>
                        </Link>
                        <Link to={"/tickets"}>
                            <p className="text-[14px] font-IRANSansXMedium text-primary">
                                            {"نیاز به پشتیبانی دارید؟"}
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}

