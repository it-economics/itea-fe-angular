import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-products',
    imports: [ProductTileComponent, FormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
    private readonly _productApiService = inject(ProductsApiService);

    products: Product[] = [];
    searchQuery = '';

    private _destroy$: Subject<void> = new Subject<void>();

    ngOnInit() {
        this._productApiService
            .getProducts()
            .pipe(takeUntil(this._destroy$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    get filteredProducts(): Product[] {
        const query = this.searchQuery.trim().toLowerCase();
        if (!query) {
            return this.products;
        }
        return this.products.filter((product) =>
            product.name.toLowerCase().includes("epic") || product.description?.toLowerCase().includes("epic"),
        );
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
