import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  patientDetails: any; 

  doctorName: string = '';
  message: string = '';

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
    this.fetchPatientData();
  }

  fetchPatientData() {
    const email = localStorage.getItem('email'); 
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }
    
    this.authService.getPatientDetails(email).subscribe(
      (data) => {
        this.patientDetails = data;

        //Function to fetch doctorName based on the Specialty
        this.fetchDoctorName(data.doctorSpecialty);
      },
      (error) => {
        console.error('Error fetching patient data:', error);
      }
    );
  }

  //Function to fetch DoctorName
  fetchDoctorName(specialty: string) {
    this.authService.getDoctorDetailsBySpecialty(specialty).subscribe(
      (data) => {
        console.log('Doctor details:', data); // Check what data you're getting
        if (data && data.length > 0) {
          const doctor: any = data.find((doctor: any) => doctor.specialty === specialty); 
          if (doctor) {
            this.doctorName = doctor.name; // Set doctorName
            this.updatePatientWithDoctor(this.patientDetails.email, this.doctorName); 
          } else {
            this.doctorName = 'No doctor found for this specialty';
            this.updatePatientWithDoctor(this.patientDetails.email, this.doctorName); 
          }
        } else {
          this.doctorName = 'No doctor found for this specialty';
          this.updatePatientWithDoctor(this.patientDetails.email, this.doctorName); 
        }
      },
      (error) => {
        console.error('Error fetching doctor details:', error);
      }
    );
  }

  // Function to update patient data with doctor's name
  updatePatientWithDoctor(email: string, doctorName: string) {
    const updatedData = { ...this.patientDetails, doctorName };
    delete updatedData._id; 
    this.authService.updatePatientData(email, updatedData).subscribe(
      (data) => {
        console.log('Patient data updated with doctorName:', data);
        this.patientDetails = data; // Update patientDetails after successful update
      },
      (error) => {
        console.error('Error updating patient data:', error);
      }
    );
  }

  // Function to send message
  sendMessage(action: string) {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error('Email not found in localStorage');
      return;
    }
  
    this.authService.sendAction(action).subscribe(
      (data: any) => {
        console.log('Message sent:', data);
        const message = data.predicted_class[0];
        this.message = message;
        this.updatePatientMessage(email, message);
      },
      (error: any) => {
        console.error('Error sending message:', error);
      }
    );
  }
    updatePatientMessage(email: string, action: string) {
    this.authService.getPatientDetails(email).subscribe(
      (data) => {
        this.patientDetails = data;
        this.authService.updatePatientMessage(data.email, action).subscribe(
          (updatedData) => {
            console.log('Patient message updated:', updatedData);
            this.patientDetails = updatedData;
            this.patientDetails.message = action; // Store the first action
          },
          (error) => {
            console.error('Error updating patient message:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }
}

