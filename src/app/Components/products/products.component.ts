import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { ProductApiManagementService } from 'src/app/Services/product-api-management.service';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  editFlag = false;
  allProducts: Product[] = [];
  fetchProductDataSubscription!: Subscription;

  constructor(
    private fetchProductData: ProductApiManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.fetchProductDataSubscription = this.fetchProductData
      .getProductDetails()
      .subscribe((response) => {
        this.allProducts = response;
      });
  }

  ngOnDestroy() {
    this.fetchProductDataSubscription.unsubscribe();
  }

  editProduct(productId?: number) {
    this.editFlag = true;
    let editProduct: Product = new Product();
    this.allProducts.find((value: Product) => {
      if (value && value.productId && value.productId === productId) {
        editProduct = value;
      }
    });
    if (editProduct !== null) {
      const dialogRef = this.dialog.open(AddUpdateProductComponent, {
        data: { editFlag: this.editFlag, product: editProduct },
      });
  
      dialogRef.afterClosed().subscribe((result: Product) => {
        if (result) {
          this.fetchProductData
          .updateProductDetails(result)
          .subscribe((res) => {
            this.allProducts = res;
            this.editFlag = false;
          });
        }
      });
    }
  }

  copyProduct(productId?: number) {
    this.editFlag = false;
    let copyProduct: Product = new Product();
    this.allProducts.find((value: Product) => {
      if (value && value.productId && value.productId === productId) {
        copyProduct = value;
      }
    });
    if (copyProduct !== null) {
      const dialogRef = this.dialog.open(AddUpdateProductComponent, {
        data: { editFlag: this.editFlag, product: copyProduct },
      });
  
      dialogRef.afterClosed().subscribe((result: Product) => {
        if (result) {
          result.productId = undefined;
          this.fetchProductData
          .addProductDetails(result)
          .subscribe((res) => {
            this.allProducts = res;
          });
        }
      });
    }
  }

  addProduct() {
    let product: Product = new Product();
      const dialogRef = this.dialog.open(AddUpdateProductComponent, {
        data: { editFlag: this.editFlag, product: product },
      });
  
      dialogRef.afterClosed().subscribe((result: Product) => {
        if (result) {
          this.fetchProductData
          .addProductDetails(result)
          .subscribe((res) => {
            this.allProducts = res;
          });
        }
      });
  }

  deleteProduct(productId?: number) {
    let deleteProduct: Product = new Product();
    this.allProducts.find((value: Product) => {
      if (value && value.productId && value.productId === productId) {
        deleteProduct = value;
      }
    });
    if (deleteProduct !== null) {
      this.fetchProductData
        .deleteProductDetails(deleteProduct)
        .subscribe((res) => {
          this.allProducts = res;
        });
    }
  }
}
