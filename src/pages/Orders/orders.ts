import axiosInstance from "../../constants/axiosConfig.ts";
import {Order} from "../../types/Order.ts";

export async function fetchAllOrders(accessToken: string): Promise<Order[]> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get<{ orders: Order[] }>("/orders/", {headers});
        const orders: Order[] = response.data.map(parseOrderResponse);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export async function fetchSingleOrder(accessToken: string, id: string): Promise<Order> {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await axiosInstance.get(`/orders/${id}/`, {headers});
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {} as Order;
    }
}
