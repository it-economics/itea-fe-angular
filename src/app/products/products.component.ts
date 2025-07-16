import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { Product } from '@models/product';
import { ProductsApiService } from '@services/http-services/products/products-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgForOf, ProductTileComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private _productApiService = inject(ProductsApiService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string;

  ngOnInit() {
    this._productApiService
      .getProducts()
      .pipe(takeUntil(this._destroy$))
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onInputChange(value: string): void {
    if (!this.products) return;
    if (!value || value.length < 3) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => this.nomaliseText(product.name).includes(this.nomaliseText(value)));
    }
  }

  private nomaliseText(text: string): string {
    return text.trim().toUpperCase();
  }
}
