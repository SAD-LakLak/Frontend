import React, {useEffect, useState} from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import {Button, Input} from "@material-tailwind/react";
import {PackageCart} from "./PackageCart.tsx";
import {useNavigate} from "react-router-dom";
import ProgressBar from "../../components/ProgressBar.tsx";
import {getDiscountCode} from "../../constants/discountCodes.ts";
import {formatPrice} from "../../utils/formatPrice.ts";

function Cart() {
    const navigate = useNavigate();
    const cart = useCart()
    const [discountCode, setDiscountCode] = useState("")

    const handleCheckDiscountCode = () => {
        const disCode = getDiscountCode(discountCode);
        cart.setDiscount(disCode.percentage)
        cart.setDiscountCode(disCode.code)
        cart.setFreeShipping(disCode.free_shipping)
    }


    return (
        <>

            <div className={"bg-primaryLight min-h-screen justify-between w-full py-4 px-16 flex flex-col gap-8"}>
                <Header/>
                <div className={"flex gap-4 h-fit"}>
                    {/*right middle*/}
                    <div className={"flex flex-col w-5/6 min-h-full gap-4"}>
                        {/* Bar */}
                        <div className="flex bg-white rounded-2xl w-full justify-center">
                            <ProgressBar level={1}/>
                        </div>
                        <div
                            className={"flex flex-wrap w-full gap-4 bg-transparent justify-start rounded-2xl h-full"}>
                            {cart.cart.map((element) => <PackageCart cartItem={{...element}}/>)}
                        </div>
                    </div>
                    {/*left middle*/}
                    <div className={"flex flex-col w-1/6 justify-between gap-4 h-fit "}>
                        {/* prices */}
                        <div
                            className={"flex flex-col items-start bg-white justify-between rounded-2xl gap-4 h-full p-6"}>
                            <div
                                className={"flex flex-col font-IRANSansXRegular justify-between items-start gap-2"}>
                                <p>{`مجموع هزینه‌ی کالاها (${formatPrice(cart.count)})`}</p>
                                <p>{`${formatPrice(cart.finalPrice)} تومان`}</p>
                            </div>
                            <div
                                className={"flex flex-col font-IRANSansXRegular justify-between items-start gap-2"}>
                                <p>{`مجموع تخفیف`}</p>
                                <p>{`${formatPrice(cart.discount * cart.finalPrice / 100)} تومان`}</p>

                            </div>
                            <div
                                className={"flex flex-col font-IRANSansXRegular font-bold justify-between items-start gap-2"}>
                                <p>{`مجموع سبد خرید`}</p>
                                <p>{`${formatPrice(cart.finalPrice - cart.discount * cart.finalPrice / 100)} تومان`}</p>
                            </div>
                            <div className={"flex w-full justify-center"}>
                                <Button
                                    className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4"
                                    onClick={() => navigate("/submitOrder", {
                                        state: {
                                            cart: cart.cart,
                                            finalPrice: cart.finalPrice,
                                            discount: cart.discount,
                                            free_shipping: cart.free_shipping,
                                        },
                                    })}>
                                    تایید و ادامه‌
                                </Button>
                            </div>
                        </div>
                        {/*discount*/}
                        <div
                            className={"flex flex-col bg-white rounded-2xl gap-2 p-6 justify-between items-center"}>
                            <Input
                                label="کد تخفیف"
                                type="text"
                                dir={"ltr"}
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXRegular"
                            />
                            {cart.discount_code &&
                                <p className={"text-xs"}>{`کد تخفیف فعلی: ${cart.discount_code}`}</p>}
                            <div className={"flex w-full justify-center"}>
                                <Button
                                    onClick={handleCheckDiscountCode}
                                    className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4">
                                    بررسی کد‌
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );

}

export default Cart;
