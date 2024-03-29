import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { HomePageComponent } from './home-page/home-page.component';
import { AddSlotComponent } from './doctor/add-slot/add-slot.component';
import { DashboardComponent } from './doctor/dashboard/dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { PatientHomePageComponent } from './patient/patient-home-page/patient-home-page.component';



//import { DoctorModule } from './doctor/doctor.module'; // Import the SlotModule

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {path :'signin' , component:SigninComponent},
  {path:'patient/homepage/:patientId/:username', component:PatientHomePageComponent},
  { path: '', component: HomePageComponent },
  //{ path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path :'signin' , component:SigninComponent},
  {path : 'slot', component: AddSlotComponent},
  {path : 'doctor/dashboard/:doctorId/:username', component: DashboardComponent},
  {path : 'patient/dashboard/:patientId/:username', component: PatientDashboardComponent},
  


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }