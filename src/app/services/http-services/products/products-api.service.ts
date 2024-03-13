import { Injectable } from '@angular/core';
import { Product } from '@models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    getProducts(): Observable<Product[]> {
        //TODO @danny use real endpoint
        const result: Product[] = [];
        for (let i = 0; i < 200; i++) {
            result.push({
                id: i,
                name: `Product ${i}`,
                description: `Description for product ${i}`,
                price: i * 11.11,
            });
        }

        return of(result);
    }
}
