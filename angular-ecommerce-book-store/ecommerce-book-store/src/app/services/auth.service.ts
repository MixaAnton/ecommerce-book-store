import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.apiUrl +"/auth"
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  storage: Storage = sessionStorage;


  constructor(private httpClient:HttpClient,private router:Router,private notificationService:NotificationService) { }

  register(registerData:any):Observable<any>{
    const url = this.authUrl+"/register";
    return this.httpClient.post<any>(url,registerData).pipe();
  }

  login(loginModel:any):Observable<any>{
    const url = this.authUrl+"/login";
    return this.httpClient.post<any>(url,loginModel).pipe();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.storage.removeItem('cartItems')
    this.setLoggedIn(false);
    this.notificationService.showInfo("You have successfully logged out","Info");
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  get isLoggedInObservable() {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(loggedIn:boolean){
    this.loggedIn.next(loggedIn);
  }
}
