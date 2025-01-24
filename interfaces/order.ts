export interface Order {
    userId: number;
    total: number;
    status: string;
    couponId: number | null; // Si puede ser opcional
    orderItems: {
        productId: number;
        quantity: number;
        price: number;
    }[];
    createdAt: Date;
}