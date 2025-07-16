import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ProductResponse } from '@services/http-services/products/product-response';
import { ProductMapper } from '@services/http-services/products/product-mapper';
// import { ProductsResponse } from '@services/http-services/products/products-response';
import { GatewayService } from '@services/http-services/gateway/gateway.service';
import { Product } from '@models/product';
import { MOCKED_PRODUCTS } from 'src/mocks/products';
@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    private _gateway = inject(GatewayService<Product>);
    mockedProductsObservable = of(MOCKED_PRODUCTS);

    getProducts(): Observable<Product[]> {
        return this.mockedProductsObservable;
    }

    // getProducts(): Observable<Product[]> {
    //     return this._gateway
    //         .get<ProductsResponse>(`products`)
    //         .pipe(map((response) => ProductMapper.fromProductsResponse(response)));
    // }

    getProduct(id: number): Observable<Product> {
        return this._gateway
            .get<ProductResponse>(`product/${id}`)
            .pipe(map((response) => ProductMapper.fromProductResponse(response)));
    }
}
