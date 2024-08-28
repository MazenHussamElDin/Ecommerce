import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ListProductsComponent } from './Components/list-products/list-products.component';
import { CartComponent } from './Components/cart/cart.component';
import { WrongPageComponent } from './Components/wrong-page/wrong-page.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full'  },
    { path: 'home', component: LandingPageComponent },
    { path: 'product', component: ListProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', component:WrongPageComponent, pathMatch: 'full' }
];
