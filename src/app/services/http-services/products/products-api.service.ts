import { Injectable } from '@angular/core';
import { Product } from '@models';
import { Observable, of } from 'rxjs';
import { productsStub } from '../../../assets/stubs';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    constructor() {}

    getProducts(): Observable<Product[]> {
        return of(productsStub); //TODO @danny use real endpoint
    }
}
