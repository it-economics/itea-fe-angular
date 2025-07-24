import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';

@Component({
    selector: 'app-products',
    imports: [ProductTileComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
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
