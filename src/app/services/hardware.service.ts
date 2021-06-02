import { Hardware } from './../models/hardware.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HardwareService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/hardware/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/hardware`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(hardware: Hardware): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/hardware/`, hardware)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(hardware: Hardware): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/hardware/${hardware._id}`, hardware)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/hardware/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
