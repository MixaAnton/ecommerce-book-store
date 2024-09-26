import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.apiUrl +"/auth"

  constructor(private httpClient:HttpClient) { }

  register(registerData:any):Observable<any>{
    const url = this.authUrl+"/register";
    return this.httpClient.post<any>(url,registerData).pipe();
  }

  login(loginModel:any):Observable<any>{
    const url = this.authUrl+"/login";
    return this.httpClient.post<any>(url,loginModel).pipe();
  }
}
