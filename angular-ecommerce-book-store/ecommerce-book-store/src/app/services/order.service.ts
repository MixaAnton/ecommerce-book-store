import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase-info';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../common/page';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = environment.apiUrl + '/orders';
  
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Page<OrderHistory>>{
    return this.httpClient.get<any>(this.orderUrl+'/all').pipe();
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.orderUrl+'/purchase', purchase);    
  }
  getOrderHistory(email:string):Observable<Page<OrderHistory>>{

    return this.httpClient.get<any>(this.orderUrl+`/history?email=${email}`).pipe();

  }
}
