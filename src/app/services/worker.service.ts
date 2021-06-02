import { Worker } from './../models/worker.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  update(worker: Worker): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/${worker._id}`, worker)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
