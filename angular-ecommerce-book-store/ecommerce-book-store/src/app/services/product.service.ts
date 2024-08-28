import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId:number): Observable<Product[]> {

    const searchUrl = categoryId === 0? this.baseUrl+'/all' : `${this.baseUrl}/by-category?=categoryId=${categoryId}`

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<any>(this.categoryUrl+'/all').pipe()
  }

  getProductListByCategories(categories:Array<number>): Observable<Product[]> {

    
    const searchUrl = `${this.baseUrl}/by-categories?categoryIds=${categories}`;

    return this.httpClient.get<any>(searchUrl).pipe();
  }
}


interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}