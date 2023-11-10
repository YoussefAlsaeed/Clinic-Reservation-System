import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    const url = `${this.baseUrl}/getDoctors`;
    return this.http.get<any[]>(url);
  }

  makeAppointment(patientID: number, slotID: number): Observable<any> {
    const url = `${this.baseUrl}/makeAppointment`;
    const body = { patientID, slotID };
    return this.http.post<any>(url, body);
  }

  getMyReservations(patientID: number): Observable<any[]> {
    const url = `${this.baseUrl}/viewReservation/${patientID}`;
    return this.http.get<any[]>(url);
  }

  cancelAppointment(appointmentID: number): Observable<any> {
    const url = `${this.baseUrl}/cancelAppointment`;
    const body = { appointmentID };
    return this.http.post<any>(url, body);
  }

  updateSlot(appointmentID: number, newSlotID: number): Observable<any> {
    const url = `${this.baseUrl}/updateSlot`;
    const body = { appointmentID, newSlotID };
    return this.http.post<any>(url, body);
  }

  updateDoctor(appointmentID: number, newDoctorID: number): Observable<any> {
    const url = `${this.baseUrl}/updateDoctor`;
    const body = { appointmentID, newDoctorID };
    return this.http.post<any>(url, body);
  }
}