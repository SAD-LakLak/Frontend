import {useEffect, useState} from "react";
import {Package} from "../../types/Package.ts";
import {fetchPackage} from "../Packages/id/Package.ts";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import {Add, Remove} from "@mui/icons-material"
import {CartItem, useCart} from "../../context/CartContext.tsx";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {formatPrice} from "../../utils/formatPrice.ts";

interface IPackageCartProps {
    cartItem: CartItem
}

export function PackageCart({cartItem}: IPackageCartProps) {
    const cart = useCart()
    const [pack, setPack] = useState<Package>({} as Package);
    const [isRemoved, setIsRemoved] = useState(false)

    useEffect(() => {
        fetchPackage(cartItem.id, setPack)
    }, []);

    const handleAdd = () => {
        cart.addToCart({
            id: pack.id,
            name: pack.name,
            price: pack.total_price,
            quantity: 1,
        })
    }
    const handleSub = () => {
        if (cartItem.quantity <= 1) {
            return
        }
        cart.subtractFromCart(cartItem.id)
    }

    const handleRemove = () => {
        cart.removeFromCart(pack.id)
        setIsRemoved(true)
    }

    return (
        <>
            {!isRemoved && <div
                className={"bg-white flex flex-col justify-start gap-4 items-center w-1/4 my-1 rounded-2xl py-4 shadow-md"}>
                <img className={"w-full px-10 rounded-2xl min-h-52 object-cover"} src={pack.image}/>
                <p className={"font-IRANSansXDemiBold"}>{replaceEnglishDigits(pack.name)}</p>
                <p className={"font-IRANSansXRegular"}>{`${formatPrice(Math.floor(pack.total_price))} تومان`}</p>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex justify-start gap-1  items-center"}>
                        <Add onClick={handleAdd} color={"primary"} className={"hover:cursor-pointer"}/>
                        <div className={"shadow-2xl bg-primaryLight rounded-md p-2"}>
                            {replaceEnglishDigits(cartItem.quantity)}
                        </div>
                        <Remove onClick={handleSub} color={"primary"} className={"hover:cursor-pointer"}/>
                    </div>
                    <DeleteForeverRoundedIcon color={"primary"} fontSize={"large"}
                                              onClick={handleRemove}
                                              className={"absolute -mr-16 hover:cursor-pointer"}/>
                </div>
            </div>}
        </>
    )
}

