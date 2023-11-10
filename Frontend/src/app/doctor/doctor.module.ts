import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddSlotComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class DoctorModule { }
