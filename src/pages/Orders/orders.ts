import axiosInstance from "../../constants/axiosConfig.ts";
import {Order} from "../../types/Order.ts";

function parseOrderResponse(data: any): Order {
    return {
        id: data.id,
        order_status: data.order_status,
        order_date: data.order_date,
        discount_amount: data.discount_amount,
        tax_amount: data.tax_amount,
        shipping_fee: data.shipping_fee,
        expected_delivery_date_time: data.expected_delivery_date_time,
        note: data.note,
        address: data.address,
        packages: data.packages,
    }
}

export async function fetchAllOrders(accessToken: string): Promise<Order[]> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get<{ orders: Order[] }>("/orders/history/", { headers });
        console.log(response.data);
        const orders: Order[] = response.data.map(parseOrderResponse);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export async function fetchSingleOrder(accessToken: string, id: string): Promise<Order | undefined> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get(`/orders/${id}/`, { headers });
        return parseOrderResponse(response.data);
    } catch (error) {
        console.error("Error fetching order:", error);
        return undefined;
    }
}
