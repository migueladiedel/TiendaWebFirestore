import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerGuard } from '../auth/customer.guard';
// import {ProductsComponent} from "@shop/products/products.component";
// import {ProductComponent} from "@shop/product/product.component";
// import {CartComponent} from "@shop/cart/cart.component";
// import {OrdersComponent} from "@shop/orders/orders.component";
// import {CustomerGuard} from "@auth/customer.guard";


const routes: Routes = [
  { path: 'shop', component: ProductsComponent},
  { path: 'product/:id', component: ProductComponent},
  { path: 'cart', component: CartComponent, canActivate: [CustomerGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [CustomerGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
