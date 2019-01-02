import {Component, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {AuthService} from "@auth/auth.service";
import {SnackService} from "@common/snack.service";
import {OrdersService} from "@common/orders.service";
import {Order} from "app/models/order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  displayedColumns = ['id', 'created_at', 'amount', 'totalProducts', 'detail'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ordersService: OrdersService,
    private snackService: SnackService,
    public auth: AuthService,
  ) {
    this.auth.user.subscribe(user => {
      if(user) {
        this.ordersService.orders(user.uid).valueChanges().subscribe(
          data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          },
          err => {
            this.snackService.launch("Error obteniendo pedidos: " + err.message, "Pedidos", 5000);
          }
        )
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackById(index, order: Order) {
    return order.id;
  }
}
