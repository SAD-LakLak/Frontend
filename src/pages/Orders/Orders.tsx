import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import OrderRow from "../../components/OrderRow.tsx";
import {Order} from "../../types/Order.ts";
import {fetchAllOrders} from "./orders.ts";
import {Link} from "react-router-dom";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";


export default function Orders() {
    const {accessToken} = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            fetchAllOrders(accessToken as string).then((data) => {
                setOrders(data);
            });
        };
        getOrders();
        
    }, [accessToken]);

    return (
        <div className={"bg-primaryLight min-h-screens h-fit w-full py-8 px-16 flex flex-col gap-8"}>
            <Header />
            <div className={"flex gap-8"}>
                {/*right part*/}
                <DashboardMenu/>
                {/*left part*/}
                <div className={"flex w-full flex-col gap-4 rounded-2xl bg-white py-8 px-8"}>
                    <div className={"flex justify-between mb-4"}>
                        <p className={"font-IRANSansXDemiBold text-2xl text-onBackground"}>تاریخچه‌ی سفارش‌ها</p>
                    </div>

                    <div className={"flex flex-col w-full h-fit gap-4 overflow-y-scroll no-scrollbar items-center"}>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <Link 
                                    to={`/orders/${order.id}`} 
                                    state={{ order }}
                                    className={"flex w-full"} 
                                    key={order.id}
                                >
                                    <OrderRow order={order} />
                                </Link>
                            ))
                        ) : (
                            <p className="mt-16 font-IRANSansXMedium">هنوز سفارشی ثبت نکرده‌اید.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}

