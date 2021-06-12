import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from './../share/share.service';
import { Cart } from './../../model/cart/cart';
import { environment } from './../../../../environments/environment';
import { JwtService } from './../jwt/jwt.service';
import { BaseResponse } from '../../model/base-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '@core/model/user/login';
import { SocialLogin } from '@core/model/user/social-login';
import { ResetPasswordRequest } from '@core/model/user/reset-password-request';
import { RegisterRequest } from '@core/model/user/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly storageService: StorageService,
    private readonly jwtService: JwtService,
    private readonly shareService: ShareService,
  ) { }


  login(request: Login): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/authenticate`, request).pipe(
      map(res => {
        if (res.isSuccessed) {
          const tokenObject = this.jwtHelperService.decodeToken(res.data);
          if (tokenObject.role !== 'Customer') {
            res.isSuccessed = false;
            res.message = "Username or password is incorrect!";
            return res;
          }
          const user = {
            ...tokenObject,
            token: res.data
          };
          this.storageService.setObject(environment.tokenKey, user);
          return res;
        }
      }),
      catchError(error => {
        return of(error.error);
      })
    );
  }

  socialLogin(request: SocialLogin): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/socialLogin`, request).pipe(
      map(res => {
        if (res.isSuccessed) {
          const tokenObject = this.jwtHelperService.decodeToken(res.data);
          if (tokenObject.role !== 'Customer') {
            res.isSuccessed = false;
            res.message = "Username or password is incorrect!";
            return res;
          }
          const user = {
            ...tokenObject,
            token: res.data
          };
          this.storageService.setObject(environment.tokenKey, user);
          return res;
        }
      }),
      catchError(error => {
        return of(error.error);
      })
    );
  }

  register(request: RegisterRequest): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/cusomerRegister`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }


  logout(): void {
    this.shareService.cartEmitEvent(new Cart());
    this.shareService.wishListEmitEvent([]);
    this.shareService.shippingAddressChangeEvent(null);
    this.storageService.remove(environment.tokenKey);
    this.storageService.remove(environment.loginMethod);
    this.storageService.remove(environment.shippingAddressKey);
    this.shareService.authenticateEvent(false);
  }

  isAuthenticated(): boolean {
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

  sendVerifyCode(email: string) {
    return this.httpClient.get(`${environment.userServiceUrl}/api/users/generateTokenResetPassword?email=${email}`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  resetPassword(request: ResetPasswordRequest): Observable<BaseResponse<string>> {
    return this.httpClient.post<BaseResponse<string>>(`${environment.userServiceUrl}/api/users/resetPassword`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  getUserById() {
    return this.httpClient.get(`${environment.userServiceUrl}/api/users/GetCutomerById`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  updateInfo(request) {
    return this.httpClient.patch(`${environment.userServiceUrl}/api/users/updateInfoForCustomer`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }

  changePassword(request) {
    return this.httpClient.post(`${environment.userServiceUrl}/api/users/changePassword`, request).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }


}
