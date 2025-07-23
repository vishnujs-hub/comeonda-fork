import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

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

  getSports(data: {
    page: number;
    size: number;
    search: string;
  }): Observable<any[]> {
    const params = {
      page: data.page,
      size: data.size,
      search: data.search,
    };

    return this.http
      .get(`${this.baseUrl}/v2/get_sports_list_admin`, { params })
      .pipe(
        map((res: any) => {
          console.log('res', res.response);
          return res.response || {};
        }),
        catchError(this.handleError)
      );
  }

  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
