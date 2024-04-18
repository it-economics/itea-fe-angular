export interface ProductsResponse {
    products: {
        id: { internalID: number };
        name: string;
        price: { cents: number };
    }[];
}
