// patient-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';

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

  constructor(private service: PatientService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
    });

    this.getDoctors();
    this.getMyReservations();
    this.getAvailableSlots();
  }

  getDoctors() {
    this.service.getDoctors().subscribe((data) => {
      this.doctorsList = data;
    });
  }

  makeAppointment() {
    if (this.selectedDoctor) {
      this.service.makeAppointment(this.patientId, this.selectedDoctor).subscribe(() => {
        // Refresh reservations after making an appointment
        this.getMyReservations();
      });
    }
  }

  getMyReservations() {
    this.service.getMyReservations(this.patientId).subscribe((data) => {
      this.myReservations = data;
    });
  }

  cancelAppointment(appointmentID: number) {
    this.service.cancelAppointment(appointmentID).subscribe(() => {
      // Refresh reservations after canceling an appointment
      this.getMyReservations();
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
