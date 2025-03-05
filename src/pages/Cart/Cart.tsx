import React, {useState} from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {useCart} from "../../context/CartContext.tsx";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import {Button, Input} from "@material-tailwind/react";
import {PackageCart} from "./PackageCart.tsx";


function Cart() {
    const cart = useCart()
    const [discount, setDiscount] = useState(0.1 * cart.finalPrice)
    const [discountCode, setDiscountCode] = useState("")
    const handleCheckDiscountCode = () => {

    }
    console.log(cart.cart[0])
    return (
        <>

            <div className={"bg-primaryLight min-h-screen justify-between w-full py-8 px-16 flex flex-col gap-4"}>
                <Header/>
                <div className={"flex gap-4"}>
                    {/*right middle*/}
                    <div className={"flex flex-col w-5/6 min-h-full gap-4"}>
                        {/*status bar*/}
                        <div className={" w-full bg-white rounded-2xl min-h-20"}></div>
                        <div
                            className={"flex overflow-x-scroll w-full bg-transparent rounded-2xl h-full"}>
                                {cart.cart.map((element) => <PackageCart cartItem={{...element}}/>)}
                        </div>
                    </div>
                    {/*left middle*/}
                    <div className={"flex flex-col w-1/6 justify-between gap-4"}>
                        {/* prices */}
                        <div
                            className={"flex flex-col items-start bg-white justify-between rounded-2xl gap-4 h-full p-2 px-4"}>
                            <div
                                className={"flex flex-col font-IRANSansXRegular justify-between items-start gap-2"}>
                                <p>{`مجموع هزینه‌ی کالاها (${replaceEnglishDigits(cart.count)})`}</p>
                                <p>{`${replaceEnglishDigits(cart.finalPrice)} تومان`}</p>
                            </div>
                            <div
                                className={"flex flex-col font-IRANSansXRegular justify-between items-start gap-2"}>
                                <p>{`مجموع تخفیف`}</p>
                                <p>{`${replaceEnglishDigits(discount)} تومان`}</p>
                            </div>
                            <div
                                className={"flex flex-col font-IRANSansXRegular font-bold justify-between items-start gap-2"}>
                                <p>{`مجموع سبد خرید`}</p>
                                <p>{`${replaceEnglishDigits(cart.finalPrice - discount)} تومان`}</p>
                            </div>
                            <div className={"flex w-full justify-center"}>
                                <Button
                                    className="rounded-full w-fit bg-primary font-IRANSansXDemiBold mt-4">
                                    تایید و ادامه‌
                                </Button>
                            </div>
                        </div>
                        {/*discount*/}
                        <div
                            className={"flex flex-col bg-white rounded-2xl gap-2 p-2 px-4 justify-between items-center"}>
                            <Input
                                label="کد تخفیف"
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                color="blue"
                                variant={"standard"}
                                className="font-IRANSansXRegular"
                            />
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
