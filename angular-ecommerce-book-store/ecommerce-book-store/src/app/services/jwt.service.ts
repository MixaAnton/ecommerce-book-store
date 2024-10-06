import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }

  hasRole(role: string): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles ||[];
     
      return roles.includes(role);
    }
    return false;
  }
 
}
