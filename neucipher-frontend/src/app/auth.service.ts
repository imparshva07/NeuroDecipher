import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

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

  
 getPatientDetails(email: string) {
    // Updated endpoint to reflect fetching by email
    return this.http.get<any>(`${this.baseUrl}/patient/email/${email}`);
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

  //Method to get the doctor's Specialty from the database
   getDoctorSpecialty() {
    return this.http.get<any[]>(`${this.baseUrl}/doctor/specialty`);
  }

  //Method to find the doctor details by the Specialty
  getDoctorDetailsBySpecialty(specialty: string) {
    return this.http.get<any>(`${this.baseUrl}/doctor/specialty/${specialty}`);
  }

  //Update to Database for the relevant Patient with the Message
  updatePatientData(email: string, updatedData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.baseUrl}/patient/email/${email}`, updatedData, httpOptions);
}

  updatePatientMessage(email: string, action: string) {
      return this.http.put<any>(`${this.baseUrl}/patient/email/${email}/message`, { action });
    }
  
  sendAction(action: string): Observable<any> {
      const encodedAction = encodeURIComponent(action);
      return this.http.post<any>(`http://localhost:3000/send-${encodedAction}`, {});
    }

//Methode to get the Patient Details by the DoctorName in order to map the Patient Name in the doctor Dashboard
getPatientsByDoctorName(doctorName: string) {
    return this.http.get<any[]>(`${this.baseUrl}/patient/doctorName/${doctorName}`).pipe(
      tap({
        next: (data) => console.log('Patient data:', data),
        error: (error) => console.error('Error fetching patient data:', error)
      }),
      catchError(this.handleError) 
    );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
}
