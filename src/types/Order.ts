export interface OrderItem {
    package: number;
    package_name: string;
    amount: number;
    total_price: number;
}

export enum OrderStatus {
    PENDING = 'Pending',
    PROCESSING = 'Processing',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled',
    RETURNED = 'Returned',
}

export interface Order {
    id: number;
    order_status: OrderStatus;
    order_date: string;
    discount_amount: number;
    tax_amount: number;
    shipping_fee: number;
    expected_delivery_date_time: string,
    note: string;
    address: number;
    packages: OrderItem[];
}


export function getOrderStatus(orderStatus: OrderStatus): string {
    const statusMap: { [key in OrderStatus]: string } = {
        [OrderStatus.PENDING]: 'در انتظار تایید',
        [OrderStatus.PROCESSING]: 'در حال پردازش',
        [OrderStatus.SHIPPED]: 'ارسال شده',
        [OrderStatus.DELIVERED]: 'تحویل شده',
        [OrderStatus.CANCELLED]: 'لغو شده',
        [OrderStatus.RETURNED]: 'بازگشت خورده',
    };
    return statusMap[orderStatus];
}