import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) { }

  signup(userData: any) {
    return this.http.post(`${this.baseUrl}/signup`, userData)
      .subscribe(
        response => console.log('Signup successful'),
        error => console.log('Signup error:', error)
      );
  }

  login(userData: { email: string; password: string; }) {
    return this.http.post<any>(`${this.baseUrl}/login`, userData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          console.log('Login successful');
        },
        error => console.log('Login error:', error)
      );
  }
}
