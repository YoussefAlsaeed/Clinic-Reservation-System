import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'http://localhost:3000/doctors'; 

  constructor(private http: HttpClient) {}

  addSlot(time :any , doctorID :any)
  {
    const body = {
      time: time,
      doctorID: doctorID
    };

    return this.http.post<any>(`${this.baseUrl}/createSlot`, body);
  }
  getSlots(doctorID :any): Observable<any[]>
  {
    const url = `${this.baseUrl}/getSlotsForDoctor/${doctorID}`;
    return this.http.get<any[]>(url);
  }

}
