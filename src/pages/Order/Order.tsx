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
        name: "",
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

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
        axios.get(`https://iranplacesapi.liara.run/api/Provinces/name/${state.value}/cities`)
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

    useEffect(() => {
        fetchItems;
    }, []);

    const AddressModal = ({ isOpen, onClose, onAddAddress }) => {
        if (!isOpen) return null;
        return (
            <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
            >
            <div className="flex bg-white rounded-2xl w-[720px] h-auto p-6" 
            onClick={(e) => e.stopPropagation()}>
                {showAddAddress ? (
                <div className="flex flex-col w-full justify-center items-center gap-4">
                    <h2 className="font-IRANSansXDemiBold text-center font-bold text-lg mb-2">افزودن آدرس جدید</h2>
                    <div className="flex flex-col w-full justify-center gap-2">
                        <input type="text" placeholder="عنوان آدرس"
                        value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full border rounded p-2 mb-2 text-right" />
                        <div className="flex gap-2">
                            <Select
                            options={states}
                            value={states.find((state: Option) => state.label === formData.province)}
                            onChange={(selectedOption) => {
                                handleStateChange;
                                formData.city = "";
                            }}
                            placeholder="استان"
                            className="flex-1 text-right"
                            />
                            <Select
                            options={cities}
                            value={cities.find((city: Option) => city.label === formData.city)}
                            onChange={handleCityChange}
                            placeholder="شهر"
                            className="flex-1 text-right"
                            isDisabled={!formData.province}
                            />
                        </div>
                        <textarea placeholder="آدرس پستی" 
                        value={formData.address} onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        className="w-full border rounded p-2 my-2 text-right" />
                        <input type="text" placeholder="کد پستی" 
                        value={formData.postal_code} onChange={(e) => setFormData((prev) => ({ ...prev, postal_code: e.target.value }))}
                        className="w-full border rounded p-2 mb-4 text-right" />
                    </div>
                    <Button onClick={fetchItems}
                            size="lg"
                            className="flex justify-center rounded-full w-fit bg-primary font-IRANSansXDemiBold font-[16px]">
                        افزودن آدرس
                    </Button>
                </div>
                ) : (
                <div>
                    <h3>Select Address</h3>
                    {/* List of addresses */}
                    <button onClick={() => setShowAddAddress(true)}>Add New Address</button>
                </div>
                )}
            </div>
            </div>
        );
    };

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
                            <button className="text-primary" dir={"rtl"} onClick={() => setIsModalOpen(true)}>تغییر آدرس</button>
                        </div>
                        <div className="flex w-full gap-4 items-center">
                            <RoomIcon className="text-primary"/>
                            <p dir={"rtl"}>{`to-do: customer address`}</p>
                        </div>
                        <AddressModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setShowAddAddress(false); // Reset modal state
                        }}
                        onAddAddress={(address) => {
                            setSelectedAddress(address);
                            setIsModalOpen(false);
                        }}
                        />
                    </div>

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
