import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase-info';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.apiUrl + '/checkout/purchase';
  
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<any>{
    return this.httpClient.get<any>(environment.apiUrl+'/checkout/all-orders').pipe();
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);    
  }
}
