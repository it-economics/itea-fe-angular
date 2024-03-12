import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent },
    { path: 'product', component: AppComponent }, //TODO @Danny
    { path: 'about', component: AboutUsComponent },
    { path: 'imprint', component: ImprintComponent },
];
