import Header from "../../../components/Home/Header.tsx";
import React, {useEffect, useState} from "react";
import Footer from "../../../components/Home/Footer.tsx";
import {Package} from "../../../types/Package.ts";
import axiosInstance from "../../../constants/axiosConfig.ts";
import {replaceEnglishDigits} from "../../../utils/replacePersianNumbers.ts";
import {Button} from "@material-tailwind/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectedComment from "../../../components/SelectedComment.tsx";

export default function SinglePackage() {
    // const {id} = useParams();
    const [pack, setPack] = useState<Package>({} as Package);

    async function fetchProduct() {
        const response = await axiosInstance.get(`/packages/?`);
        console.log(response.data.results[0])
        setPack(response.data.results[0])
    }

    useEffect(() => {
        fetchProduct()
    }, []);

    return (<>
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight min-h-screen h-fit justify-between relative">
            <Header/>
            <div className={"flex w-full h-fit gap-8"}>
                {/*right section*/}
                <div className={"flex flex-col w-1/5 h-fit gap-6"}>
                    <img src={pack.image} className={"object-contain w-full rounded-2xl"}/>
                    <div
                        className={"rounded-2xl bg-white shadow-2xl justify-center items-center flex flex-col py-4 px-8"}>
                        <p className={"font-IRANSansXBold text-center"}>
                            {replaceEnglishDigits(pack.total_price) + " هزار تومان"}
                        </p>
                        <Button
                            className="rounded-full w-full bg-primary font-IRANSansXDemiBold mt-4">
                            افزودن به سبد خرید
                        </Button>
                    </div>
                </div>
                {/*left section*/}
                <div className={"flex flex-col flex-grow h-fit rounded-2xl bg-white shadow-2xl p-4 gap-4"}>
                    <div className={"flex w-full justify-between items-center"}>
                        <p className={"font-IRANSansXBold text-2xl"}>{pack.name}</p>
                        <div className={"flex flex-row-reverse items-end justify-start gap-2"}>
                            <img src={"/icons/star.svg"} className={"h-full w-full"}/>
                            <p className={"font-IRANSansXRegular"}>{replaceEnglishDigits(Math.floor(Number(pack.score)))}</p>
                        </div>
                    </div>
                    <div className={"flex w-full justify-between items-center"}>
                        <p className={"font-IRANSansXDemiBold text-md text-gray-500"}>{pack.summary}</p>
                        <p className={"font-IRANSansXRegular ml-2"}>{"(" + replaceEnglishDigits(11) + " نظر)"}</p>
                    </div>
                    <div className={"flex w-full flex-col justify-start gap-4 items-start"}>
                        <p className={"font-IRANSansXBold text-2xl"}>{"توضیحات"}</p>
                        <p className={"font-IRANSansXMedium text-md"}>{pack.description}</p>
                    </div>
                    <div className={"flex w-full flex-col justify-start gap-4 items-start"}>
                        <p className={"font-IRANSansXBold text-2xl"}>{"محتویات"}</p>
                        <ul className={"flex flex-col gap-2 list-disc mr-8"}>
                            <li>محتویات ملزومات بیمارستانی نوزاد.</li>
                            <li>محتویات ملزومات بیمارستانی نوزاد.</li>
                            <li>محتویات ملزومات بیمارستانی نوزاد.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"flex w-full h-fit gap-8"}>
                {/*right section*/}
                <div
                    className={"flex w-1/5 h-fit gap-8 justify-between items-center bg-white rounded-2xl shadow-2xl pl-8 px-4 py-4"}>
                    <div className={"flex flex-col w-full h-full debug justify-between gap-4 items-center"}>
                        <p className={"font-IRANSansXBold w-full text-center text-xl text-primary"}>
                            نظرات خریداران
                        </p>
                        <div className={"flex flex-row-reverse items-end justify-start gap-2"}>
                            <img src={"/icons/star.svg"} className={"h-full w-full"}/>
                            <p className={"font-IRANSansXRegular"}>{replaceEnglishDigits(Math.floor(Number(pack.score)))}</p>
                        </div>
                        <p className={"font-IRANSansXBold text-center text-md"}>
                            {`از ${replaceEnglishDigits(11)} نظر`}
                        </p>
                    </div>
                    <ArrowBackIcon className={"text-primary scale-[3]"}/>
                </div>
                {/*left section*/}
                <div className={"flex w-full h-fit bg-transparent p-4 gap-4 "}>
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