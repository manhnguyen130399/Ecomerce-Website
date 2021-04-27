import { catchError } from 'rxjs/operators';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getAllBrand() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/brand/brand-all-store`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
