import { Component, OnInit } from '@angular/core';
import { Product } from "@models/product";
import { Router } from "@angular/router";

import { Order } from "@models/order";
import { AuthService } from '@auth/auth.service';
import { CartService } from '@common/cart.service';
import { SnackService } from '@common/snack.service';
import { AppService } from '@common/app.service';
import { OrdersService } from '@common/orders.service';
// External Libraries
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  totalPrice: number;
  uid: string;

  constructor(
    public auth: AuthService,
    public cartService: CartService,
    public snackService: SnackService,
    private router: Router,
    public appService: AppService,
    private ordersService: OrdersService
  ) {
    this.auth.user.subscribe(user => {
      if(user) {
        this.cartService.myCart(user.uid).subscribe(cart => {
          this.cart = cart.payload.data();
          this.totalPrice = this.cartService.totalPrice(this.cart.products);
          this.uid = user.uid;
        })
      }
    })
  }

  update(product: Product, qty) {
    this.appService.fireLoader();
    this.cartService.updateProduct(product, qty.value, this.uid).then(() => {
      this.snackService.launch("Producto actualizado", "Carrito", 4000);
      this.appService.stopLoader();
    })
    .catch(() => {
      this.snackService.launch('Error actualizando el producto', 'Carrito', 4000);
      this.appService.stopLoader();
    });
  }

  remove(product: Product) {
    this.appService.fireLoader();
    this.cartService.removeProduct(product, this.uid).then(() => {
      this.snackService.launch("Producto eliminado", "Carrito", 4000);
      this.appService.stopLoader();
    })
      .catch(() => {
        this.snackService.launch('Error eliminando el producto', 'Carrito', 4000);
        this.appService.stopLoader();
      });
  }

  ngOnInit() {
  }

  processOrder() {
    const moment = extendMoment(Moment);    
    let order: Order = {
      id: null,
      uid: this.uid,
      products: this.cart.products,
      amount: this.totalPrice,
      totalProducts: this.cart.totalProducts,
      created_at: moment().toDate() 
    };

    this.ordersService.save(order).then(() => {
      this.cartService.resetCart(this.uid).then(() => {
        this.snackService.launch('Carrito eliminado y pedido creado', 'Carrito', 6000);
        this.router.navigate(['/orders']);
      })
    })
  }
}
