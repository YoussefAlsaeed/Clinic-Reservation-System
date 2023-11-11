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
  username:any;
  doctorsList: any[] = [];
  myReservations: any[] = [];
  availableSlots: any[] = [];
  selectedUpdateAppointment: number = 0;
  selectedDoctor: number = 0;
  selectedReservation: number = 0;
  selectedReservationForSlotUpdate: number = 0;
  selectedReservationForDoctorUpdate: number = 0;
  newSlotID:any;
  newDoctorID: any;
  selectedAppointment: any;
  // Add this property to your component
  showUpdateFormFlag: boolean = false;

  constructor(private service: PatientService, private route: ActivatedRoute,public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
      this.username = params['username'];
    });

    this.getDoctors();
    this.getMyReservations();
    this.getAvailableSlots();
  }
  

// Modify your showUpdateForm method
showUpdateForm(reservation:any) {
  this.selectedUpdateAppointment = reservation.appointmentID;
  this.showUpdateFormFlag = true;
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

    
  console.log("Selected Appointment ID:", this.selectedUpdateAppointment);
  console.log("Selected Slot ID:", this.newSlotID);
    if (this.selectedUpdateAppointment && this.newSlotID) {
      console.log("entered "+this.selectedUpdateAppointment);
      console.log("entered "+this.newSlotID);
      
      this.service.updateSlot(this.selectedUpdateAppointment, this.newSlotID.slotId).subscribe(
        () => {
          // Refresh reservations after updating appointment slot
          this.getAvailableSlots();
          console.log(this.selectedUpdateAppointment);
          console.log(this.newSlotID);
          this.getMyReservations();
         
        },
        (error) => {
          // Display error message
      
          console.error('Error updating appointment slot', error);
          this.getMyReservations();
        }
      );
    }
  // After updating, you might want to hide the update form
  this.showUpdateFormFlag = false;
  }


  updateDoctor() {
    console.log("out"+this.selectedUpdateAppointment);
          console.log("out"+this.newDoctorID);
    if (this.selectedUpdateAppointment && this.newDoctorID) {
      this.service.updateDoctor(this.selectedUpdateAppointment, this.newDoctorID.doctorId).subscribe(() => {
        console.log(this.selectedUpdateAppointment);
        console.log(this.newDoctorID);
        // Refresh available slots after updating a doctor
        this.getAvailableSlots();
      });
    }
  }

  private getAvailableSlots() {
    this.service.getAvailableSlots().subscribe((data) => {
      this.availableSlots = data;
      console.log('Available Slots:', this.availableSlots);
    });
  }
}
