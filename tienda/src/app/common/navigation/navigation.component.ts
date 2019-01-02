import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth/auth.service";
import {CartService} from "@common/cart.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  cart: any;
  constructor(
    public auth: AuthService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(data => {
      if(data) {
        if(data.role === 'customer') {
          const cartRef = this.cartService.myCartRef(data.uid).get();
          cartRef.then((cart) => {
            if(cart.exists) {
              this.cartService.myCart(data.uid).subscribe(myCart => {
                this.cart = myCart.payload.data();
              })
            } else {
              this.cartService.createCart(data.uid);
              this.cartService.myCart(data.uid).subscribe(myCart => {
                this.cart = myCart.payload.data();
              })
            }
          })
        }
      }
    })
  }

}
