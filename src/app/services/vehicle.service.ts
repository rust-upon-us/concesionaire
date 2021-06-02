import { Vehicle } from './../models/vehicle.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  getItemProduct(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/productos/producto/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getListProduct(filter: any): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/productos`,  { params: filter }).pipe(
      catchError((error) => {
        return error;
      })
    );
  }

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/vehicle/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/vehicle`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(vehicle: Vehicle): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/vehicle/`, vehicle)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(vehicle: Vehicle): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/vehicle/${vehicle._id}`, vehicle)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/vehicle/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
