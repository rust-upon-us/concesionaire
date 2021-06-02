import { Financing } from './../models/financing.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FinancingService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/financing/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/financing`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(financing: Financing): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/financing/`, financing)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(financing: Financing): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/financing/${financing._id}`, financing)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/financing/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
