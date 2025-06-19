import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5259/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, data);
  }

  login(data: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${BASE_URL}/auth/login`, data);
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/notes`, {
      headers: this.authHeader(),
    });
  }

  private authHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
