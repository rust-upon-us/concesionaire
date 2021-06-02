import { Billing } from './../models/billing.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BillingService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/billing/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/billing`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(billing: Billing): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/billing/`, billing)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(billing: Billing): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/billing/${billing._id}`, billing)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/billing/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
