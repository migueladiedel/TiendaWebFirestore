import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth/auth.service";
import {CartService} from "@common/cart.service";
import {Cart} from "../../models/cart";
import {Product} from "../../models/product";
import {SnackService} from "@common/snack.service";
import {Router} from "@angular/router";
import {Order} from "../../models/order";
import {AppService} from "@common/app.service";
import {OrdersService} from "@common/orders.service";

declare const moment: any;

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
    let order: Order = {
      id: null,
      uid: this.uid,
      products: this.cart.products,
      amount: this.totalPrice,
      totalProducts: this.cart.totalProducts,
      created_at: moment(new Date).format('DD/MM/YYYY')
    };

    this.ordersService.save(order).then(() => {
      this.cartService.resetCart(this.uid).then(() => {
        this.snackService.launch('Carrito eliminado y pedido creado', 'Carrito', 6000);
        this.router.navigate(['/orders']);
      })
    })
  }
}
