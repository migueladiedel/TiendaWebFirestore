import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin/admin.component';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { ProductsComponent } from './products/products.component';

import { UploadFormComponent } from './upload-form/upload-form.component';
import { SharedModule } from '../shared/shared.module';
import { UploadService } from './upload.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [AdminComponent, ProductsDialogComponent, ProductsComponent, UploadFormComponent],
  entryComponents: [ProductsDialogComponent],
  providers: [UploadService]
})
export class AdminModule { }
