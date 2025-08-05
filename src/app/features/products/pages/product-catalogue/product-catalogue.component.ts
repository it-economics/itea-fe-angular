import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Product } from '../../product.model';
import { Subject, takeUntil } from 'rxjs';
import { ProductsApiService } from '../../services/products-api.service';

@Component({
    selector: 'app-product-catalogue',
    imports: [CurrencyPipe, MatCardModule, MatIconModule, RouterLink],
    templateUrl: './product-catalogue.component.html',
    styleUrl: './product-catalogue.component.scss',
})
export class ProductCatalogueComponent implements OnInit, OnDestroy {
    private readonly _productApiService = inject(ProductsApiService);

    products: Product[] = [];
    private _destroy$: Subject<void> = new Subject<void>();

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
