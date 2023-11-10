// patient-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelConfirmationDialogComponent } from '../cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  patientId: any;
  doctorsList: any[] = [];
  myReservations: any[] = [];
  availableSlots: any[] = [];

  selectedDoctor: number = 0;
  selectedReservation: number = 0;
  selectedReservationForSlotUpdate: number = 0;
  selectedReservationForDoctorUpdate: number = 0;
  newSlotID: number = 0;
  newDoctorID: number = 0;
  selectedAppointment: any;

  constructor(private service: PatientService, private route: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
    });

    this.getDoctors();
    this.getMyReservations();
    this.getAvailableSlots();
  }
  storeID(event :any) {
    //this.selectedAppointment =  event.target.value.slotId;;
    console.log("asjkhsjhsa "+this.selectedAppointment.slotId);
  }
  getDoctors() {
    this.service.getDoctors().subscribe((data) => {
      this.doctorsList = data;
    });
  }

  makeAppointment() {
    if (this.selectedAppointment) {
      this.service.makeAppointment(this.patientId, this.selectedAppointment.slotId).subscribe(() => {
        // Refresh reservations after making an appointment
        console.log("asjkhsjhsa hsbhsa");
        this.getMyReservations();
        this.getDoctors()
      });
    }
  }

  getMyReservations() {
    this.service.getMyReservations(this.patientId).subscribe((data) => {
      this.myReservations = data;
      console.log(data);
    });
  }

  cancelAppointment(appointmentID: number) {
    console.log("hi"+appointmentID);
    // Open the confirmation dialog
    const dialogRef: MatDialogRef<CancelConfirmationDialogComponent> = this.dialog.open(CancelConfirmationDialogComponent);
    
  // Subscribe to the confirmation result
  dialogRef.afterClosed().subscribe((result: boolean) => {
    console.log("hehe");
    console.log(result);
    if (result) {
      // User confirmed, proceed with cancellation
      console.log(appointmentID);
      this.service.cancelAppointment(appointmentID).subscribe(() => {
        
        // Refresh reservations after canceling an appointment
        this.getMyReservations();
      });
    }
    else {
      console.error('Invalid appointmentID:', appointmentID);}
  });
  }

  updateSlot() {
    if (this.selectedReservationForSlotUpdate && this.newSlotID) {
      this.service.updateSlot(this.selectedReservationForSlotUpdate, this.newSlotID).subscribe(() => {
        // Refresh available slots after updating a slot
        this.getAvailableSlots();
      });
    }
  }

  updateDoctor() {
    if (this.selectedReservationForDoctorUpdate && this.newDoctorID) {
      this.service.updateDoctor(this.selectedReservationForDoctorUpdate, this.newDoctorID).subscribe(() => {
        // Refresh available slots after updating a doctor
        this.getAvailableSlots();
      });
    }
  }

  private getAvailableSlots() {
    // Implement logic to fetch and update available slots
  }
}
