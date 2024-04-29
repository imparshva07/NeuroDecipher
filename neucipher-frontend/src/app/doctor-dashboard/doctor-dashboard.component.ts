import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {
  doctorDetails: any; 
  doctorMessages: any[] = []; 
  
  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
    this.fetchdoctorData();
  }

  fetchdoctorData() {
    const email = localStorage.getItem('email'); 
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }
    
    this.authService.getDoctorDetails(email).subscribe(
      (data) => {
        this.doctorDetails = data;
        //Function call
        this.fetchPatientData(data.name);
      },
      (error) => {
        console.error('Error fetching doctor data:', error);
      }
    );
  }

  

  //Function to fetch relevant Message from the Patient
  fetchPatientData(doctorName: string) {
    this.authService.getPatientsByDoctorName(doctorName).subscribe(
      (data) => {
        console.log('Patient data:', data);
        this.doctorMessages = []; 
        data.forEach((patient: any) => {
          const message = patient.message;
          const patientName = patient.username;
          if (message) {
            this.doctorMessages.push({ patientName, message });
          }
        });
        console.log('Doctor Messages:', this.doctorMessages);
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    );
  }
    confirmLogout() {
            if (confirm("Are you sure you want to logout?")) {
              // Redirect to login page
              window.location.href = './login-doctor/login-doctor.component.html';
            } else {
              // Redirect to dashboard page
              window.location.href = './doctor-dashboard/doctor-dashboard.component.html';
            }
          }

   isHelpMe(message: string): boolean {
    return message.toLowerCase().includes('help me');
  }
  
  isStop(message: string): boolean {
    return message.toLowerCase().includes('stop');
  }
  
}
