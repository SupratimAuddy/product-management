import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css'],
})
export class AddUpdateProductComponent {
  editFlag: boolean = false;
  product!: Product;
  constructor(
    public dialogRef: MatDialogRef<AddUpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { editFlag: boolean; product: Product }
  ) {}
  
  ngOnInit(): void {
    if (this.data) {
      if (this.data.editFlag) {
        this.editFlag = this.data.editFlag;
      }
      if (this.data.product) {
        this.product = this.data.product;
      }
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
