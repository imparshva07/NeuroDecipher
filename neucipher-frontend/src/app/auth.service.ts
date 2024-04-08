import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  signup(userData: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/signup`, userData, httpOptions)
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

  
  getPatientDetails(_id: string) {
    // Updated endpoint to reflect fetching by email
    return this.http.get<any>(`${this.baseUrl}/patient/email/${_id}`);
  } 

  
  // For Doctor Signup and login
  signupDoctor(userData: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/signupdoctor`, userData, httpOptions)
      .subscribe(
        response => console.log('Signup successful'),
        error => console.log('Signup error:', error)
      );
  }

  logindoctor(userData: { email: string; password: string; }) {
    return this.http.post<any>(`${this.baseUrl}/logindoctor`, userData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          console.log('Login successful');
        },
        error => console.log('Login error:', error)
      );
  }

  getDoctorDetails(_id: string) {
    // Updated endpoint to reflect fetching by email
    return this.http.get<any>(`${this.baseUrl}/doctor/email/${_id}`);
  } 
  
}
