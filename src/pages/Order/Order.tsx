import React from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {Button} from "@material-tailwind/react";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useState, useEffect} from 'react';
import ProgressBar from "../../components/ProgressBar.tsx";
import {Package} from '../../types/Package.ts';
import {Link} from "react-router-dom";
import RoomIcon from '@mui/icons-material/Room';


function Order() {
    const [items, setItems] = useState<Package[]>([]);
    const [cart, setCart] = useState({
        items: [],
        cart_cost: 0,
        shipping_cost: 0,
        total_cost: 0,
        free_shipping: false,
    });

    const [shipping, setShipping] = useState<String>();
    const [payment, setPayment] = useState<String>();

    const fetchItems = async (cartToApply) => {
        try {
            const query = Object.entries(cartToApply)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            const response = await axiosInstance.get(`/items/?${query}`);
            setItems(response.data.results);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems;
    }, []);

    return (
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight h-auto justify-center relative">
            <Header/>

            {/* Center */}
            <div className="flex justify-between gap-8 w-full">
                <div className="flex flex-col h-auto justify-top w-full gap-4">
                    {/* Bar */}
                    <div className="flex bg-white rounded-2xl w-full justify-center">
                        <ProgressBar level={2}/>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-6">
                        <div className="flex w-full justify-between items-center">
                            <p className="font-IRANSansXDemiBold text-[20px]" dir={"rtl"}>{`انتخاب آدرس`}</p>
                            <p className="text-primary" dir={"rtl"}>{`تغییر آدرس`}</p>
                        </div>
                        <div className="flex w-full gap-4 items-center">
                            <RoomIcon className="text-primary"/>
                            <p dir={"rtl"}>{`to-do: customer address`}</p>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-8 w-full h-fit" dir="rtl">
                        {items.map((item: Package) => (
                            <Link to={`/packages/${item.id}`}> <CartItem item={item}/></Link>
                        ))}
                    </div> */}

                    {/* Delivery */}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                        <p className="font-IRANSansXDemiBold text-[20px] mb-2" dir={"rtl"}>{`انتخاب شیوه‌ی ارسال`}</p>
                        <p className="mb-2" dir={"rtl"}>{`مدت زمان پردازش سفارشات یک الی دو روز کاری است. سفارش شما در اولین روز کاری بعد از اتمام پردازش، ارسال می‌شود.`}</p>
                        <div className="flex w-full justify-between items-center">
                            <div className={"flex items-center gap-4"}>
                                <input 
                                    type="radio" 
                                    className="accent-primary" 
                                    checked={shipping === "post"} 
                                    onChange={() => setShipping("post")} 
                                />
                                <p dir={"rtl"}>{`ارسال با پست پیشتاز (تحویل ۴ تا ۷ روز کاری دیگر)`}</p>
                            </div>
                            <p dir={"rtl"}>{`۵۰ هزار تومان`}</p>
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <div className={"flex items-center gap-4"}>
                                <input 
                                    type="radio" 
                                    className="accent-primary" 
                                    checked={shipping === "bike"} 
                                    onChange={() => setShipping("bike")} 
                                />
                                <p dir={"rtl"}>{`ارسال با پیک لک‌لک (تحویل ۲ تا ۴ روز کاری دیگر، بازه‌ی زمانی ۱۸ تا ۲۱)`}</p>
                            </div>
                            <p dir={"rtl"}>{`۷۰ هزار تومان`}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                        <p className="font-IRANSansXDemiBold text-[20px] mb-2" dir={"rtl"}>{`انتخاب شیوه‌ی پرداخت`}</p>
                        <div className={"flex items-center gap-4"}>
                            <input 
                                type="radio" 
                                className="accent-primary" 
                                checked={payment === "credit"} 
                                onChange={() => setPayment("credit")} 
                            />
                            <p dir={"rtl"}>{`کیف پول لک‌لک`}</p>
                        </div>
                        <div className={"flex items-center gap-4"}>
                            <input 
                                type="radio" 
                                className="accent-primary" 
                                checked={payment === "online"} 
                                onChange={() => setPayment("online")} 
                            />
                            <p dir={"rtl"}>{`درگاه پرداخت اینترنتی`}</p>
                        </div>
                    </div>
                </div>

                {/* Left Bar */}
                <div className="w-[264px] h-fit flex flex-col gap-2 bg-white rounded-2xl p-6 items-start">
                    <p dir={"rtl"}>{`مجموع سبد خرید`}</p>
                    <p className="mb-2" dir={"rtl"}>{replaceEnglishDigits(cart.cart_cost) + " تومان"}</p>
                    <p dir={"rtl"}>{`هزینه ارسال`}</p>
                    <p className="mb-2" dir={"rtl"}>{cart.free_shipping ? "رایگان!" : replaceEnglishDigits(cart.shipping_cost)  + " تومان"}</p>
                    <p dir={"rtl"}>{`قابل پرداخت`}</p>
                    <p className="mb-2" dir={"rtl"}>{replaceEnglishDigits(cart.total_cost)  + " تومان"}</p>
                    <div className={"flex w-full justify-center"}>
                        <Button onClick={fetchItems}
                                className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4">
                            پرداخت و ثبت سفارش
                        </Button>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Order;
