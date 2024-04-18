export interface ProductResponse {
    product: {
        id: { internalID: number };
        name: string;
        price: { cents: number };
    };
}
