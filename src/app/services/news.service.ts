import { News } from './../models/news.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  getItem(id: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/dashboard/news/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  getList(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/dashboard/news`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  getListHome(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/news`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  save(news: News): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/dashboard/news/`, news)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  update(news: News): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/dashboard/news/${news._id}`, news)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.apiUrl}/dashboard/news/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }
}
