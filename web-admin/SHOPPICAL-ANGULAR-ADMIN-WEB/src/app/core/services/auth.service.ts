import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '@models/auth/login';
import { BaseResponse } from '@models/base-response';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(request: Login): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/users/authenticate`, request);
  }

  isAuthenticated() {
    const token = localStorage.getItem(environment.tokenKey);
    if (!token) {
      return false;
    }
    return true;
  }
}
