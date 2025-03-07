import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";
import React from "react";

type Props = {
    score: string,
    text: string,
}

export default function SelectedComment(props: Props) {

    return (
        <>
            <div className={"flex flex-col w-1/4 flex-shrink h-full min-h-40 rounded-2xl shadow-md bg-white p-8 gap-2"}>
                <div className={"flex flex-row-reverse items-end justify-start h-6 gap-2"}>
                    <img src={"/icons/star.svg"} className={"h-full"}/>
                    <p className={"font-IRANSansXRegular"}>{replaceEnglishDigits(Math.floor(Number(props.score)))}</p>
                </div>
                <p className={"mt-4 text-justify"}>
                    {props.text}
                </p>
            </div>
        </>
    )
}