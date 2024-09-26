import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Page } from '../common/page';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.apiUrl+'/users';
  userId: Subject<number> = new BehaviorSubject<number>(0);

  constructor(private httpService:HttpClient) { }

  setUserId(id:number){
    this.userId.next(id);
  }

  getUsers(pageNumber:number,pageSize:number):Observable<Page<any>>{
    const url = this.userUrl +"/all";
    
    return this.httpService.get<any>(url,).pipe();
  }

  changePassword(changePasswordRequest:any):Observable<any>{
    const url = this.userUrl+"/change-password";
    return this.httpService.patch(url,changePasswordRequest).pipe();
  }

  changeUsersStatus(userId:number):Observable<any>{
    const url = this.userUrl + `/change-status/${userId}`;
    return this.httpService.get<any>(url).pipe();
  }
}
