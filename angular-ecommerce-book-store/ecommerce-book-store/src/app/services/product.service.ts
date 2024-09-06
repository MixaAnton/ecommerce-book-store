import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  private productUrl = `${this.baseUrl}/products`;
  private categoryUrl = `${this.baseUrl}/product-category`;

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {

    const productUrl = `${this.productUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListByCategory(categoryId:number): Observable<Product[]> {

    const searchUrl = categoryId === 0? this.productUrl+'/all' : `${this.productUrl}/by-category?=categoryId=${categoryId}`

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<any>(this.categoryUrl+'/all').pipe()
  }

  getProductListByCategories(categories:Array<number>): Observable<Product[]> {

    
    const searchUrl = `${this.productUrl}/by-categories?categoryIds=${categories}`;

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  searchProducts(page:number,pageSize:number,keyword: string): Observable<Page<Product>> {

    const searchUrl = `${this.productUrl}/find-by-name?name=${keyword}`
                      +`&page=${page}&size=${pageSize}`;

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