import React from "react";
import {formatPrice} from "../utils/formatPrice.ts";

type Props = {
    score: string,
    text: string,
}

export default function SelectedComment(props: Props) {

    return (
        <>
            <div className={"flex flex-col w-[280px] flex-shrink h-[320px] min-h-40 rounded-2xl bg-white p-8 gap-2"}>
                <div className={"flex flex-row-reverse items-end justify-end h-6 gap-2"}>
                    <p className={"font-IRANSansXRegular"}>{formatPrice(Number(props.score).toFixed(1))}</p>
                    <img src={"/icons/star.svg"} className={"h-full"}/>
                </div>
                <p className={"mt-4 text-justify"}>
                    {props.text}
                </p>
            </div>
        </>
    )
}