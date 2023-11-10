import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FormsModule } from '@angular/forms';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';
import { PatientDashboard2Component } from './patientdashboard2/patientdashboard2.component';
import { CancelConfirmationDialogComponent } from './cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientHomePageComponent,
    PatientDashboard2Component,
    CancelConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ]
})
export class PatientModule { }
