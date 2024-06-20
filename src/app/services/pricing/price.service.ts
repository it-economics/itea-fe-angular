import { Injectable } from '@angular/core';
import { TaxType } from '@models/tax-type';
import { Product } from '@models/product';

@Injectable({
    providedIn: 'root',
})
export class PriceService {
    constructor() {}

    calculateNetPrice(product: Product): number {
        if (product.taxType === TaxType.STANDARD) {
            return product.price / 1.19;
        } else if (product.taxType === TaxType.REDUCED) {
            return product.price / 1.07;
        } else if (product.taxType === TaxType.ZERO) {
            return product.price;
        }
        throw new Error('Tax type not supported');
    }
}
