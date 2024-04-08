import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {
  doctorDetails: any; 

  constructor(private authService: AuthService) { }

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
      },
      (error) => {
        console.error('Error fetching doctor data:', error);
      }
    );
  }
}
