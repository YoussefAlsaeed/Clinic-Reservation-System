// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getEventsForDoctor(doctorId: number): Observable<any> {
    const url = `${this.apiUrl}/doctors/getEventsForDoctor/${doctorId}`;
    return this.http.get(url);
  }
}