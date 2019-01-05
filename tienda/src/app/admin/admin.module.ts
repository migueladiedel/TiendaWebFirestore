import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@admin/admin-routing.module';

import { AdminComponent } from '@admin/admin/admin.component';
import { ProductsDialogComponent } from '@admin/products-dialog/products-dialog.component';
import { ProductsComponent } from '@admin/products/products.component';

import { UploadFormComponent } from '@admin/upload-form/upload-form.component';
import { SharedModule } from '@shared/shared.module';
import { UploadService } from '@admin/upload.service';

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
