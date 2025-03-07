import React from 'react';
import {Package} from '../types/Package.ts';
import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";

interface CartItemProps {
    item: Package;
}

const CartItem: React.FC<CartItemProps> = ({item}) => {
    return (
        <div className={"rounded-[35px] h-[384px] bg-white flex-column justify-center items-center text-center p-6 mx-2"}>
            <div className="h-3/5 flex justify-center items-center mt-2">
                <img src={item.image} className="w-full h-full object-contain"></img>
            </div>
            <p className=" font-IRANSansXDemiBold text-onBackground text-[16px] mt-6 mb-4" dir="rtl">{item.name}</p>
            <p className=" font-IRANSansXRegular text-onBackground my-2" dir="rtl">{item.summary}</p>
            <p className=" font-IRANSansXRegular text-onBackground mt-2" dir="rtl">
                {replaceEnglishDigits(String(item.total_price)) + " تومان "}
            </p>
        </div>
    );
};

export default CartItem;
