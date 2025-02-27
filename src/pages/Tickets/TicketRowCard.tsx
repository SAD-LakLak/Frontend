import {Button} from "@material-tailwind/react";
import React from "react";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";

type Props = {
    state: string,
    date: string,
    title: string
}

export default function TicketRowCard(props: Props) {
    return (
        <div className={"flex border-gray-200 border-2 w-full h-16 rounded-2xl py-4 px-8 justify-between items-center"}>
            <p className={"font-IRANSansXBold text-onBackground opacity-80 text-lg"}>{replaceEnglishDigits(props.title)}</p>
            <div className={"flex gap-28"}>
                <p className={"font-IRANSansXRegular flex items-center text-onBackground opacity-80"}>{replaceEnglishDigits(props.date)}</p>
                <Button disabled={true}
                        className={"bg-primary py-2 text-center flex items-center font-IRANSansXRegular rounded-2xl"}>{replaceEnglishDigits(props.state)}</Button>
            </div>
        </div>
    )
}