import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';
import { MOCKED_PRODUCTS } from 'src/mocks/products';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CurrencyPipe, MatButtonModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
    product: Product | undefined;

    private _destroy$: Subject<void> = new Subject<void>();
    private _productApiService = inject(ProductsApiService);
    private _route = inject(ActivatedRoute);

    ngOnInit() {
        this._route.paramMap.pipe(takeUntil(this._destroy$)).subscribe((params: ParamMap) => {
            const productId: number = Number(params.get('id'));
            this.product = MOCKED_PRODUCTS.find((mockedProduct: Product) => mockedProduct.id === productId);
            // this._productApiService
            //     .getProduct(Number(productId))
            //     .pipe(takeUntil(this._destroy$))
            //     .subscribe((product) => {
            //         this.product = product;
            //     });
        });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
