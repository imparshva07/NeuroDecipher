import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    userData = {
      name: '',
      email: '',
      username: '',
      gender: '',
      contactNumber: '',
      password: '',
      dob: '',
      doctorSpecialty: '' 
    };
    confirmPassword: string = '';

    doctors: string[] = [];
  
  constructor(private authService: AuthService, private router: Router) { }

  validateContactNumber(): boolean {
    const contactNumberRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    return contactNumberRegex.test(this.userData.contactNumber);
  }

  ngOnInit() {
    this.fetchDoctorDetails();  
  }

  //Call to fetch doctor details based on Specialty
  fetchDoctorDetails() {
    this.authService.getDoctorSpecialty().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctor details:', error);
      }
    );
  }
  
    onSignup() {
      if (!this.validateContactNumber()) {
        // Handle invalid contact number
        console.log("Invalid contact number. Please enter exactly 10 digits.");
        return;
      }
      this.authService.signup(this.userData); //facing issue in API call
      alert('Signup successful!');
      this.router.navigate(['/login']);
    }
}
