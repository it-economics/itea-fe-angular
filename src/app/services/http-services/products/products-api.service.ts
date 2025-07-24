import { Injectable, inject, isDevMode } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductResponse } from '@services/http-services/products/product-response';
import { ProductMapper } from '@services/http-services/products/product-mapper';
import { ProductsResponse } from '@services/http-services/products/products-response';
import { GatewayService } from '@services/http-services/gateway/gateway.service';
import { Product } from '@models/product';

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
