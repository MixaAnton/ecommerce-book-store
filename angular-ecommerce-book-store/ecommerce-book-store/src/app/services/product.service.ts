import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Author, Language, Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';
import { Page } from '../common/page';
import { Sorting } from '../common/sort';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  private productUrl = `${this.baseUrl}/products`;
  private categoryUrl = `${this.baseUrl}/product-category`;
  private authorUrl = `${this.baseUrl}/author`
  private languageUrl = `${this.baseUrl}/language`

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {

    const productUrl = `${this.productUrl}/single?id=${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListByCategory(page:number,pageSize:number,categoryId:number,sort:Sorting): Observable<Product[]> {

    const searchUrl = categoryId === 0? 
    this.productUrl+`/all?&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}` 
    : `${this.productUrl}/by-category?categoryId=${categoryId}&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}`

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<any>(this.categoryUrl+'/all').pipe()
  }

  getProductAuthors():Observable<Author[]>{
    return this.httpClient.get<any>(this.authorUrl+'/all').pipe();
  }

  getProductLanguages():Observable<Language[]>{
    return this.httpClient.get<any>(this.languageUrl+'/all').pipe();
  }

  getProductListByCategories(page:number,pageSize:number,categories:Array<number>,sort:Sorting): Observable<Product[]> {

    
    const searchUrl = `${this.productUrl}/by-categories?categoryIds=${categories}&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}`;

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  getLastThreeProducts():Observable<Product[]>{
    const url = `${this.productUrl}/last-three-products`;

    return this.httpClient.get<any>(url).pipe();
  }

  searchProducts(page:number,pageSize:number,keyword: string,sort:Sorting): Observable<Page<Product>> {

    const searchUrl = `${this.productUrl}/find-by-name?name=${keyword}`
                      +`&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}`;

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  searchByProductsOrAuthor(page:number,pageSize:number,searchTerm: string,categories:Array<number>,sort:Sorting):Observable<Page<Product>>{
    const searchUrl = `${this.productUrl}/find-by-name-or-author?searchTerm=${searchTerm}&categoryIds=${categories}`
                      +`&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}`;

    return this.httpClient.get<any>(searchUrl).pipe();
  }

  filterProductsByPrice(startPrice:number,endPrice:number,categories:Array<number>,page:number,pageSize:number,sort:Sorting):Observable<Page<Product>>{
    const searchUrl = `${this.productUrl}/filter-by-price?startPrice=${startPrice}&endPrice=${endPrice}&categoryIds=${categories}`
    +`&page=${page}&size=${pageSize}&sort=${sort.columnName},${sort.order}`;
      return this.httpClient.get<any>(searchUrl).pipe();
  }

  create(product:any):Observable<any>{
    const url = `${this.productUrl}/create`
   return this.httpClient.post<any>(url,product).pipe();
  }
  editProduct(product:any,productId:any):Observable<any>{
    const url = `${this.productUrl}/update/${productId}`;
    return this.httpClient.put<any>(url,product).pipe();
  }
  deleteProduct(productId:any):Observable<any>{
    const url = `${this.productUrl}/delete/${productId}`;
    return this.httpClient.delete<any>(url).pipe();
  }
}
