import React from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {Button} from "@material-tailwind/react";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useState, useEffect} from 'react';
import ProgressBar from "../../components/ProgressBar.tsx";
import {Package} from '../../types/Package.ts';
import Select from "react-select";
import axios from "axios";

function Order() {
    const [items, setItems] = useState<Package[]>([]);
    const [cart, setCart] = useState({
        items: [],
        cart_cost: 0,
        shipping_cost: 0,
        total_cost: 0,
        free_shipping: false,
    });

    const [formData, setFormData] = useState({
        province: "",
        city: "",
        address: "",
        postal_code: "",
    });

    type Option = {
        label: string;
        value: number;
    };

    const [shipping, setShipping] = useState<String>();
    const [payment, setPayment] = useState<String>();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [checked, setChecked] = useState<boolean>(true);
    
    const handleStateChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            province: selectedOption?.label || "",
            city: "",
        }));
    };
      
    const handleCityChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            city: selectedOption?.label || "",
        }));
    };

    useEffect(() => {
        axios.get("https://iranplacesapi.liara.run/api/Provinces")
          .then(({ data }) => {
            setStates(data.map((item => ({ label: item.name, value: item.id }))));
          })
          .catch(err => console.error(err));
      }, []
    );

    useEffect(() => {
        if (!formData.province) return;
        let state = states.find((state: Option) => state.label === formData.province) as Option | undefined;
        if (state !== undefined)
        axios.get(`https://iranplacesapi.liara.run/api/Provinces/id/${state.value}/cities`)
            .then(({ data }) => {
            setCities(data.map(item => ({ label: item.name, value: item.id })));
            })
            .catch(err => console.error(err));
    }, [formData.province]);

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

    const handleOrder = async () => {
        
    }

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
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-2">
                        <div className="flex w-full justify-between items-center">
                            <p className="font-IRANSansXDemiBold text-[20px] mb-4" dir={"rtl"}>{`آدرس ارسال`}</p>
                        </div>
                        <div className="flex w-full justify-between gap-4">
                            <Select
                            options={states}
                            value={states.find((state: Option) => state.label === formData.province)}
                            onChange={(selectedOption) => {
                                handleStateChange(selectedOption);
                            }}
                            placeholder="استان"
                            className="flex-1 text-right"
                            />
                            <Select
                            options={cities}
                            value={formData.city != "" ? cities.find((city: Option) => city.label === formData.city) : []}
                            onChange={(selectedOption) => {
                                handleCityChange(selectedOption);
                            }}
                            placeholder="شهر"
                            className="flex-1 text-right"
                            isDisabled={!formData.province}
                            />
                        </div>
                        <textarea placeholder="آدرس پستی" rows={3}
                        value={formData.address} onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        className="w-full border rounded p-2 my-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue" />
                        <div className="flex w-full justify-between items-center gap-4 mb-4">
                            <input type="text" placeholder="کد پستی" 
                            value={formData.postal_code} onChange={(e) => setFormData((prev) => ({ ...prev, postal_code: e.target.value }))}
                            className="w-full border rounded p-2 text-righ focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue" />
                            <div className={"w-full inline-flex gap-2 items-center"}> {/* checkbox */}
                                <label className="flex items-top py-2 cursor-pointer relative">
                                    <input 
                                    type="checkbox" id="check" checked={checked} onChange={(e) => setChecked(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary" />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <p dir={"rtl"}> ذخیره‌ی آدرس برای خریدهای بعدی </p> 
                            </div>
                        </div>
                    </div>

                    {/* Delivery */}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                        <p className="font-IRANSansXDemiBold text-[20px] mb-2" dir={"rtl"}>{`شیوه‌ی ارسال`}</p>
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
                                <p dir={"rtl"}>{`ارسال با پیک لک‌لک - ویژه شهر تهران (تحویل ۲ تا ۴ روز کاری دیگر، بازه‌ی زمانی ۱۸ تا ۲۱)`}</p>
                            </div>
                            <p dir={"rtl"}>{`۷۰ هزار تومان`}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                        <p className="font-IRANSansXDemiBold text-[20px] mb-2" dir={"rtl"}>{`شیوه‌ی پرداخت`}</p>
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
                        <Button onClick={handleOrder()}
                                className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4"
                                disabled={!formData.province || !formData.city || formData.address.length < 10 || formData.postal_code.length < 10 || !shipping || !payment}>
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
