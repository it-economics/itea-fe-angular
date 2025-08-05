import { Routes } from '@angular/router';
import { ProductDetailComponent } from './features/products/pages/product-detail/product-detail.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ImprintComponent } from './features/imprint/imprint.component';
import { ProductCatalogueComponent } from './features/products/pages/product-catalogue/product-catalogue.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductCatalogueComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'imprint', component: ImprintComponent },
];
