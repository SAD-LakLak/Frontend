import React from 'react';
import {Package} from '../types/Package.ts';
import {replaceEnglishDigits} from "../utils/replacePersianNumbers.ts";

interface PackageCardProps {
    pack: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({pack}) => {
    return (
        <div className={"rounded-[35px] h-384 flex flex-column items-center px-4 py-6"}>
            <p className=" font-IRANSansXDemiBold text-onBackground" dir="rtl">{pack.name}</p>
            <p className=" font-IRANSansXRegular text-onBackground" dir="rtl">{pack.summary}</p>
            <p className=" font-IRANSansXRegular text-onBackground" dir="rtl">
                {replaceEnglishDigits(String(pack.total_price)) + " تومان "}
            </p>
        </div>
    );
};

export default PackageCard;
