import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@models';
import { ProductsApiService } from '@services';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
    product: Product;

    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        private readonly _productApiService: ProductsApiService,
        private readonly _route: ActivatedRoute
    ) {}

    ngOnInit() {
        this._route.paramMap.pipe(takeUntil(this._destroy$)).subscribe((params: ParamMap) => {
            const productId = Number(params.get('id'));
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
