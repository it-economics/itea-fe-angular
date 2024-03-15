import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ImprintComponent } from './imprint/imprint.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'imprint', component: ImprintComponent },
];
