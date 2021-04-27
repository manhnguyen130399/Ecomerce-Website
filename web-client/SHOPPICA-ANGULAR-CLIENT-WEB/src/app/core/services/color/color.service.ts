import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getAllColor() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/color/color-all-store`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
