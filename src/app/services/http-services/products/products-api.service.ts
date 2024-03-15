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
            result.push(this.fakeProduct(i));
        }

        return of(result);
    }

    getProduct(id: number): Observable<Product> {
        //TODO @danny use real endpoint
        return of(this.fakeProduct(id));
    }

    private fakeProduct(id: number) {
        return {
            id,
            name: `Product ${id}`,
            description: `Description for product ${id}`,
            price: id * 11.11,
        };
    }
}
