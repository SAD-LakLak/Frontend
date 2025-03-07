import Header from "../../../components/Home/Header.tsx";
import React, {useEffect, useState} from "react";
import Footer from "../../../components/Home/Footer.tsx";
import {Package} from "../../../types/Package.ts";
import {replaceEnglishDigits} from "../../../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectedComment from "../../../components/SelectedComment.tsx";
import {useCart} from "../../../context/CartContext.tsx";
import {fetchPackage} from "./Package.ts";
import {useParams} from "react-router-dom";
import {formatPrice} from "../../../utils/formatPrice.ts";

export default function SinglePackage() {
    const {id} = useParams();
    const [pack, setPack] = useState<Package>({} as Package);
    const {cart, addToCart, updateQuantity} = useCart();

    useEffect(() => {
        fetchPackage(Number(id), setPack)
    }, []);

    const handleAddToCart = () => {
        for (const cartItem of cart) {
            if (cartItem.id === pack.id) {
                updateQuantity(pack.id, cartItem.quantity + 1)
                return
            }
        }
        addToCart({id: pack.id, quantity: 1, name: pack.name, price: pack.total_price})
        return;
    }

    return (<>
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight min-h-screen h-fit justify-between relative">
            <Header/>
            <div className={"flex w-full h-fit gap-8"}>
                {/*right section*/}
                <div className={"flex flex-col w-1/5 h-fit gap-6"}>
                    <img src={pack.image} className={"object-contain w-full rounded-2xl"}/>
                    <div
                        className={"rounded-2xl bg-white shadow-xl justify-center items-center flex flex-col p-6"}>
                        <p className={"font-IRANSansXMedium text-center"}>
                            {replaceEnglishDigits(Math.floor(pack.total_price) / 1000) + " هزار تومان"}
                        </p>
                        <Button
                            onClick={handleAddToCart}
                            className="rounded-full w-full bg-primary font-IRANSansXDemiBold mt-4">
                            افزودن به سبد خرید
                        </Button>
                    </div>
                </div>
                {/*left section*/}
                <div className={"flex flex-col w-4/5 flex-grow h-fit rounded-2xl bg-white shadow-xl p-8 gap-4"}>
                    <div className={"flex w-full justify-between items-center"}>
                        <p className={"font-IRANSansXBold text-2xl"}>{pack.name}</p>
                        <div className={"flex flex-row-reverse items-end justify-start gap-2"}>
                            <img src={"/icons/star.svg"} className={"h-1/2 w-1/2 min-h-1/2 min-w-1/2"}/>
                            <p className={"font-IRANSansXRegular"}>{formatPrice(Math.floor(Number(pack.score)))}</p>
                        </div>
                    </div>
                    <div className={"flex w-full justify-between items-center"}>
                        <p>{pack.summary}</p>
                        <p className={"font-IRANSansXRegular"}>{"(" + formatPrice(11) + " نظر)"}</p>
                    </div>
                    <div className={"flex w-full flex-col justify-start gap-4 items-start mt-4"}>
                        <p className={"font-IRANSansXDemiBold text-2xl"}>{"توضیحات"}</p>
                        <p>{pack.description}</p>
                    </div>
                    <div className={"flex w-full flex-col justify-start gap-4 items-start mt-4"}>
                        <p className={"font-IRANSansXDemiBold text-2xl"}>{"محتویات"}</p>
                        <ul className={"flex flex-col gap-2 list-disc mr-8"}>
                            {pack.products && pack.products.map((product, index) => <li key={index}>{product}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"flex w-full h-fit justify items-top gap-8 mt-4"}>
                {/*right section*/}
                <div
                    className={"flex w-1/5 h-fit gap-8 justify-between items-center bg-white rounded-2xl shadow-xl pl-8 p-4"}>
                    <div className={"flex flex-col w-full h-full justify-between gap-4 items-center py-2"}>
                        <p className={"font-IRANSansXDemiBold w-full text-center text-2xl text-primary"}>
                            نظرات خریداران
                        </p>
                        <div className={"flex flex-row-reverse items-end justify-start gap-2"}>
                            <img src={"/icons/star.svg"} className={"h-full w-full"}/>
                            <p className={"font-IRANSansXMediun"}>{replaceEnglishDigits(Math.floor(Number(pack.score)))}</p>
                        </div>
                        <p className={"font-IRANSansXMedium text-center text-md"}>
                            {`از ${replaceEnglishDigits(11)} نظر`}
                        </p>
                    </div>
                    <ArrowBackIcon className={"text-primary scale-[3]"}/>
                </div>
                {/*left section*/}
                <div className={"flex w-full h-fit bg-transparent gap-4"}>
                    <SelectedComment score={"3.5"}
                                     text={"دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم."}/>
                    <SelectedComment score={"3.5"}
                                     text={"دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم."}/>
                    <SelectedComment score={"3.5"}
                                     text={"دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم."}/>
                    <SelectedComment score={"4"}
                                     text={"دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم. دوست داشتم. اینم توضیحات بیشترم."}/>
                </div>
            </div>
            <Footer/>
        </div>
    </>)

}