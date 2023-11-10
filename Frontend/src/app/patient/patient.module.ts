import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FormsModule } from '@angular/forms';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientHomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class PatientModule { }
