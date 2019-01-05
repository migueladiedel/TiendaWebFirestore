import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickModule } from "ngx-slick";

import { ShopRoutingModule } from '@shop/shop-routing.module';
import { ProductsComponent } from '@shop/products/products.component';
import { ProductComponent } from '@shop/product/product.component';
import { CartComponent } from '@shop/cart/cart.component';
import { OrdersComponent } from '@shop/orders/orders.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SlickModule.forRoot()
  ],
  declarations: [ProductsComponent, ProductComponent, CartComponent, OrdersComponent]
})
export class ShopModule { }
