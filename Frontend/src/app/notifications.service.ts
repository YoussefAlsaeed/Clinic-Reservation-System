// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment} from '../environments/environment'
import * as configData from '../config.json';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = (configData as any).default.API_URL;
    console.log('API URL:', this.baseUrl);
  }

  getEventsForDoctor(doctorId: number): Observable<any> {
    const url = `${this.baseUrl}/doctors/getEventsForDoctor/${doctorId}`;
    console.log('API URL in events doctor:', this.baseUrl);
    return this.http.get(url);
  }
}