import {Component, Inject} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Product} from "../../models/product";
import {Upload} from "../../models/upload";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { SnackService } from '../../common/snack.service';
import { ProductsService } from '../../common/products.service';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.css']
})
export class ProductsDialogComponent {

  uploads;

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<ProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private snackService: SnackService,
    public auth: AuthService,
    private productService: ProductsService,
    private uploadService: UploadService
  ) {
    if(data.id) {
      this.uploads = this.productService.product(this.data.id).collection('uploads').snapshotChanges().map(actions => {
        return actions.map(upload => {
          const data = upload.payload.doc.data();
          const id = upload.payload.doc.data;
          return {id, ...data};
        })
      })
    }
  }

  saveProduct() {
    if(this.data.id) {
      this.productService.update(this.data).then(() => {
        this.snackService.launch("Producto actualizado", "Tienda", 4000);
      })
        .catch(error => {
          this.snackService.launch("Error: " + error.message, "Tienda", 4000);
        })
    } else {
      this.productService.save(this.data).then(() => {
        this.snackService.launch("Producto creado", "Tienda", 4000);
      })
        .catch(error => {
          this.snackService.launch("Error: " + error.message, "Tienda", 4000);
        })
    }
    this.dialogRef.close();
  }

  removeUpload(upload: Upload) {
    this.uploadService.removeFile(upload.id).then(() => {
      this.afs.doc(`products/${this.data.id}/uploads/${upload.id}`).delete().then(() => {
        this.snackService.launch("Adjunto eliminado", "Tienda", 4000);
      })
        .catch(error => {
          this.snackService.launch("Error: " + error.message, "Tienda", 4000);
        })
    })
  }
}
