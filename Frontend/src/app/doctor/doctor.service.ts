import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment} from '../../environments/environment'
import * as configData from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = (configData as any).default.API_URL+'/doctors';
    console.log('API URL:', this.baseUrl);
  }
  
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