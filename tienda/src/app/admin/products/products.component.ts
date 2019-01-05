import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource } from "@angular/material";

import { Product } from "@models/product";
import { ProductsService } from '@common/products.service';
import { SnackService } from '@common/snack.service';
import { AuthService } from '@auth/auth.service';
import { ProductsDialogComponent } from '@admin/products-dialog/products-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  displayedColumns = ['name', 'price', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private snackService: SnackService,
    public auth: AuthService,
  ) {
    this.productService.products().valueChanges().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    },
    err => {
      this.snackService.launch("Error obteniendo productos: " + err.message, "Productos", 5000);
    })
  }

  applyFilter(filterValue) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackById(index, product: Product) {
    return product.id;
  }

  openDialog(product: Product) {
    this.dialog.open(ProductsDialogComponent, ProductsComponent.dialogConfig(product));
  }

  addProduct() {
    let product: Product = new Product;
    this.dialog.open(ProductsDialogComponent, ProductsComponent.dialogConfig(product));
  }

  private static dialogConfig(data): MatDialogConfig {
    const config: MatDialogConfig = new MatDialogConfig;
    config.width = '700px';
    config.data = data;
    return config;
  }

  // remove(product: Product) {
  //   this.productService.remove(product.id).then(() => {
  //     this.snackService.launch('Producto eliminado correctamente', "Productos", 5000);
  //   })
  // }
}
