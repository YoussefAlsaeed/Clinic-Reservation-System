import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddSlotComponent } from './doctor/add-slot/add-slot.component';
import { DashboardComponent } from './doctor/dashboard/dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomePageComponent },
  //{ path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path :'signin' , component:SigninComponent},
  {path : 'slot', component: AddSlotComponent},
  {path : 'doctor/dashboard/:doctorId', component: DashboardComponent},
  {path : 'patient/dashboard/:patientId', component: PatientDashboardComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }