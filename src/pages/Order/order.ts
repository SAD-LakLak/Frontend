import axiosInstance from "../../constants/axiosConfig.ts";
import {NotifConfig} from "../../components/Alert.tsx";
import {useNavigate} from "react-router-dom";

export interface Item {
    id: string;
    price: number;
    quantity: number;
}

interface IOrderBody {
    address: number,
    discount: null,
    discount_amount: number,
    tax_amount: number,
    shipping_fee: number,
    note: string,
    packages: [Item],
}

interface IAddressBody {
    address_line_1: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    phone_number: string,
    is_default: boolean,
    is_deleted: boolean,
}

export const order = async (
    createOrderData: IOrderBody,
    createAddressData: IAddressBody,
    showNotification: (config: NotifConfig) => void,
    accessToken: string,
    navigate: ReturnType<typeof useNavigate>
) => {
    const body = createAddressData;
    const notifConfig: NotifConfig = {
        timeout: 1500, notifType: "error", text: "مشکلی پیش آمده است.", show: true
    };

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    axiosInstance
        .post("/addresses/", body, {headers})
        .then((res) => {
            console.log(res);
            createOrderData.address = res.data.id;
            return axiosInstance.post("/orders/create/", createOrderData, {headers});
        })
        .then((res) => {
            console.log(res);
            navigate(`/orderSubmitted`);
        })
        .catch((err) => {
            notifConfig.notifType = "error";
            notifConfig.text = err.response?.data?.detail || "مشکلی پیش آمده است.";
        })
        .finally(() => {
            showNotification(notifConfig);
        });
};
