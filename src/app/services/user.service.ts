import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  login(user: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login`, user).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
}
