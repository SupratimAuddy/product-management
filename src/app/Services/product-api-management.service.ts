import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiManagementService {
  readonly productApiUrl = "https://localhost:7298/api/Product";

  constructor(private http: HttpClient) { }

  public getProductDetails(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiUrl);
  }

  public addProductDetails(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.productApiUrl, product);
  }

  public updateProductDetails(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(this.productApiUrl, product);
  }

  public deleteProductDetails(product: Product): Observable<Product[]> {
    return this.http.delete<Product[]>(this.productApiUrl+'?ProductId='+product.productId);
  }
}
