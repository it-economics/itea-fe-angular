import { Injectable, inject, isDevMode } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { Product } from '../product.model';
import { ProductMapper } from './product-mapper';
import { ProductResponse } from './product-response';
import { ProductsResponse } from './products-response';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    private readonly _gateway = inject(GatewayService<Product>);

    getProducts(): Observable<Product[]> {
        if (isDevMode()) {
            return this.getMockProducts();
        }

        return this._gateway
            .get<ProductsResponse>(`products`)
            .pipe(map((response) => ProductMapper.fromProductsResponse(response)));
    }

    getProduct(id: number): Observable<Product> {
        if (isDevMode()) {
            return this.getMockProduct(id);
        }

        return this._gateway
            .get<ProductResponse>(`product/${id}`)
            .pipe(map((response) => ProductMapper.fromProductResponse(response)));
    }

    private getMockProducts(): Observable<Product[]> {
        return this._gateway.get<ProductsResponse>(`products`);
    }

    private getMockProduct(id: number): Observable<Product> {
        return this._gateway.get<ProductResponse>(`products/${id}`);
    }
}
