import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';

@Component({
    selector: 'app-product',
    imports: [CurrencyPipe],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
    private readonly _productApiService = inject(ProductsApiService);
    private readonly _route = inject(ActivatedRoute);

    product: Product;

    private _destroy$: Subject<void> = new Subject<void>();

    ngOnInit() {
        this._route.paramMap.pipe(takeUntil(this._destroy$)).subscribe((params: ParamMap) => {
            const productId: number = Number(params.get('id'));
            this._productApiService
                .getProduct(Number(productId))
                .pipe(takeUntil(this._destroy$))
                .subscribe((product) => {
                    this.product = product;
                });
        });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
