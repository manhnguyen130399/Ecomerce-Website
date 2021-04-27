import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getAllCategory() {
    return this.httpClient.get(`${environment.productServiceUrl}/api/category/category-all-store`).pipe(
      catchError(error => {
        return of(error.error);
      })
    );
  }
}
