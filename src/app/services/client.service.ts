import { Client } from './../models/client.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/client/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/client`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(client: Client): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/client/`, client)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(client: Client): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/client/${client._id}`, client)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/client/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
