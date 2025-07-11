import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';

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
    private _productApiService = inject(ProductsApiService);

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
