export interface Order {
    id: number;
    customerId: number;
    dateCreated: Date;
    dateIssued: Date;
    dateModified: Date;
    TotalAmount: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    unitPrice: number;
    initialUnitPrice: number;
    quantity: number;
}
