import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl =  environment.baseUrl+'/patients'; 

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
    const url = `${this.baseUrl}/cancelAppointment/${appointmentID}`;
    return this.http.delete<any>(url);
  }

  updateSlot(appointmentID: number, newSlotID: number): Observable<any> {
    const url = `${this.baseUrl}/updateSlot`;
    console.log(appointmentID);
    console.log(newSlotID);

    const body = { appointmentID, newSlotID};
    console.log('Request Body:', body);
    return this.http.put<any>(url, body);
    
  }

  updateDoctor(appointmentID: number, newDoctorID: number): Observable<any> {
    const url = `${this.baseUrl}/updateDoctor`;
    const body = { appointmentID, newDoctorID };
    console.log('Request Body:', body);
    return this.http.put<any>(url, body);
  }
  
  getAvailableSlots(): Observable<any[]> {
    const url = `${this.baseUrl}/getDoctors`;
    return this.http.get<any[]>(url);
  }

}
