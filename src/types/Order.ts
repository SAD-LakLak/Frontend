export interface OrderItem {
    package: number;
    price: number;
    amount: number;
}

export interface Order {
    id: number;
    order_status: string;
    address: number;
    discount: number;
    discount_amount: number;
    tax_amount: number;
    shipping_fee: number;
    note: string;
    packages: OrderItem[];
}
