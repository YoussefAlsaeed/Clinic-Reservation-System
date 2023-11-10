import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FormsModule } from '@angular/forms';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';

import { CancelConfirmationDialogComponent } from './cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientHomePageComponent,

    CancelConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ]
})
export class PatientModule { }
