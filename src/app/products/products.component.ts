import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@models';
import { ProductsApiService } from '@services';
import { Subject, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';
import { ProductTileComponent } from './product-tile/product-tile.component';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [NgForOf, ProductTileComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private readonly _productApiService: ProductsApiService) {}

    ngOnInit() {
        this._productApiService
            .getProducts()
            .pipe(takeUntil(this._destroy$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
