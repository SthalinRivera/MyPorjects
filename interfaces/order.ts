export interface Order {
    userId: number;
    clientName?: string;
    clientPhone?: string;
    total: number;
    status?: string;
    couponId?: number | null;
    orderItems: {
        productId: number;
        quantity: number;
        price: number;
    }[];
}
