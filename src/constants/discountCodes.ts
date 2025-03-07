import {DiscountCode} from "../types/discountCode.ts";

export const discountCodes: DiscountCode[] = [
    {
        code: "laklakbox1",
        percentage: 10,
        free_shipping: false,
    },
    {
        code: "laklakbox2",
        percentage: 20,
        free_shipping: false,
    },
    {
        code: "laklakbox3",
        percentage: 30,
        free_shipping: true
    },
    {
        code: "laklakbox4",
        percentage: 40,
        free_shipping: true
    },

]


export const getDiscountCode = (code): DiscountCode => {
    for (const discountCode of discountCodes) {
        if (discountCode.code === code) {
            return discountCode
        }
    }
    return {code: "", free_shipping: false, percentage: 0}
}