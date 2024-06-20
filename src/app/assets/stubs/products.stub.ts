import { Product } from '@models/product';
import { TaxType } from '@models/tax-type';

export const productsStub: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Description for product 1',
        imageUrl: 'product-1.jpg',
        price: 11.11,
        taxType: TaxType.STANDARD,
    },
    {
        id: 2,
        name: 'Product 2',
        imageUrl: 'product-2.jpg',
        description: 'Description for product 2',
        price: 22.22,
        taxType: TaxType.REDUCED,
    },
];
