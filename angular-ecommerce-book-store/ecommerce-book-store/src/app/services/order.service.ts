import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase-info';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../common/page';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = environment.apiUrl + '/orders';
  orderId: Subject<number> = new BehaviorSubject<number>(0);
  
  constructor(private httpClient: HttpClient) { }

  setOrderId(id:number){
    this.orderId.next(id);
  }

  getOrders(pageNumber:number,pageSize:number): Observable<Page<OrderHistory>>{
    return this.httpClient.get<any>(this.orderUrl+`/all?&page=${pageNumber}&size=${pageSize}`).pipe();
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.orderUrl+'/purchase', purchase);    
  }
  getOrderHistory(email:string,pageNumber:number,pageSize:number):Observable<Page<OrderHistory>>{

    return this.httpClient.get<any>(this.orderUrl+`/history?email=${email}&page=${pageNumber}&size=${pageSize}`).pipe();

  }

  changeOrderStatus(orderId:any,status:any):Observable<any>{

    return this.httpClient.get<any>(this.orderUrl+`/change-status?orderId=${orderId}&status=${status}`).pipe();
  }
}
