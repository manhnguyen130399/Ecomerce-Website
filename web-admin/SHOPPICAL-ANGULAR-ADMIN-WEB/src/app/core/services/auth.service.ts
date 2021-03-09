import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/auth/login';
import { BaseResponse } from 'src/app/models/base-response';
import { User } from 'src/app/models/users/user';
import { environment } from 'src/environments/environment';

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
