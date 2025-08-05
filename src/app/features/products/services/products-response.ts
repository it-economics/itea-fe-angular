export interface ProductsResponse {
    products: {
        id: { internalID: number };
        name: string;
        imageName: string;
        price: { cents: number };
        description: string;
    }[];
}
