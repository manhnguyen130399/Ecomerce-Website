import { environment } from './../../../../environments/environment';
import { Login } from './../../model/login';
import { JwtService } from './../jwt/jwt.service';
import { BaseResponse } from '../../model/base-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly storageService: StorageService,
    private readonly jwtService: JwtService
  ) { }


  login(request: Login): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/authenticate`, request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          const tokenObject = this.jwtHelperService.decodeToken(result.data);
          const user = {
            ...tokenObject,
            token: result.data
          };
          this.storageService.setObject(environment.tokenKey, user);
        }
      }),
      catchError(error => {
        return of(error.error);
      })
    );
  }

  isAuthenticated() {
    return this.jwtService.isTokeExpire();
  }

  checkEmailExist(email: string): Observable<ValidationErrors> {
    return this.httpClient.get<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/checkEmailExist?email=${email}`).pipe(
      map(result => {
        if (result.isSuccessed) {
          return null;
        }
      }),
      catchError(error => {
        return of({ error: true, duplicated: true });
      })
    );
  }
}
