import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  patientDetails: any; // Variable to store patient details

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchPatientData();
  }

  fetchPatientData() {
    const email = localStorage.getItem('email'); // Retrieve patient's email from localStorage
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }
    
    this.authService.getPatientDetails(email).subscribe(
      (data) => {
        this.patientDetails = data;
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    );
  }
}

