import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { SignupDoctorComponent } from './signup-doctor/signup-doctor.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '', component : HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logindoctor', component: LoginDoctorComponent},
  { path: 'signupdoctor', component: SignupDoctorComponent},
  {path: 'patientdashboard', component: PatientDashboardComponent},
  {path: 'doctordashboard', component: DoctorDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
