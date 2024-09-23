import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = environment.apiUrl;
  private emailUrl = `${this.baseUrl}/email`;
  
  constructor(private httpClient: HttpClient) { }

  sendEmail(emailRequest:any):Observable<any>{
    
    const url = `${this.emailUrl}/send-email`
   return this.httpClient.post<any>(url,emailRequest,{responseType:'text' as 'json'}).pipe();
  }
}
