import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // constructor(private readonly jwtHelperService: JwtHelperService) { }

  setToken(token: string, expire: number) {
    const data = {
      value: token,
      expire: token //convert second to milliseconds
    }
    localStorage.setItem(environment.tokenKey, JSON.stringify(data));
  }

  getToken() {
    const tokenObject = localStorage.getItem(environment.tokenKey);
    if (!tokenObject) {
      return null;
    }

    const item = JSON.parse(tokenObject);
    if (Date.now() > item.expire) {
      localStorage.removeItem(environment.tokenKey);
      return null
    }

    return item.value;
  }

  removeToken() {
    localStorage.removeItem(environment.tokenKey);
  }
}
