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
  private infoChanged = new BehaviorSubject<boolean>(false);
  private statusChanged = new BehaviorSubject<boolean>(false);
  private roleChanged = new BehaviorSubject<boolean>(false);

  constructor(private httpClient:HttpClient) { }

  setUserId(id:number){
    this.userId.next(id);
  }

  get isInfoChangedObservable() {
    return this.infoChanged.asObservable();
  }

  setInfoChanged(loggedIn:boolean){
    this.infoChanged.next(loggedIn);
  }

  get statusChangedObservable() {
    return this.statusChanged.asObservable();
  }

  setStatusChanged(statusActive:boolean){
    this.statusChanged.next(statusActive);
  }

  get roleChangedObservable() {
    return this.roleChanged.asObservable();
  }

  setRoleChanged(changed:boolean){
    this.roleChanged.next(changed);
  }

  getUser(id:number):Observable<any>{
    const url = this.userUrl+"/single/"+id;

    return this.httpClient.get<any>(url).pipe();
  }

  getUsers(pageNumber:number,pageSize:number):Observable<Page<any>>{
    const url = this.userUrl +`/all?&page=${pageNumber}&size=${pageSize}`;
    
    return this.httpClient.get<any>(url).pipe();
  }

  changePassword(changePasswordRequest:any):Observable<any>{
    const url = this.userUrl+"/change-password";
    return this.httpClient.patch(url,changePasswordRequest).pipe();
  }

  changeUsersStatus(userId:number):Observable<any>{
    const url = this.userUrl + `/change-status/${userId}`;
    return this.httpClient.get<any>(url,{responseType:'text' as 'json'}).pipe();
  }

  getRoles():Observable<any>{
    const url = this.userUrl +'/roles';
    return this.httpClient.get<any>(url).pipe();
  }
  editUser(userUpdate:any):Observable<any>{
    const url = this.userUrl+'/update';
    return this.httpClient.put<any>(url,userUpdate).pipe();
  }

  changeUsersRole(userId:number,roleId:number):Observable<any>{
    const url = this.userUrl + `/changeRole/${userId}?roleId=${roleId}`;
    return this.httpClient.get<any>(url).pipe();
  }
}
