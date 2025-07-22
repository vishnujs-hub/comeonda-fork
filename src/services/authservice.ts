import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private http = inject(HttpClient);
  baseUrl: string = 'https://betty-dev-api.xminds.in/';

  login(credentials: {
    username: string;
    password: string;
    device_token: [];
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.access_token) {
          localStorage.setItem('auth_token', res.access_token);
        }
      }, catchError(this.handleError))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
