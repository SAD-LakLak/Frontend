import React from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import clsx from "clsx";

const ProgressBar = ({level}) => {
    return (
        <div className="flex w-[560px] h-auto justify-between p-6 items-center">
          <ShoppingBasketIcon className={clsx(level >= 1 ? "text-primary" : "text-primaryMiddle")} />
          <div className={clsx("flex-1 border-b-2 mx-2", level >= 2 ? "border-primary" : "border-primaryMiddle")} />
          <LocalShippingIcon className={clsx(level >= 2 ? "text-primary" : "text-primaryMiddle")} />
          <div className={clsx("flex-1 border-b-2 mx-2", level >= 3 ? "border-primary" : "border-primaryMiddle")} />
          <CheckCircleIcon className={clsx(level >= 3 ? "text-primary" : "text-primaryMiddle")} />
        </div>
    );
};

export default ProgressBar;
