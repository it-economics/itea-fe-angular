import { TaxType } from '@models/tax-type';

export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    taxType?: TaxType;
}
