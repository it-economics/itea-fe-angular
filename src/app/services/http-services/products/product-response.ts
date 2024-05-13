export interface ProductResponse {
    product: {
        id: { internalID: number };
        name: string;
        imageName: string;
        price: { cents: number };
        description: string;
    };
}
