// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) {}

  getEventsForDoctor(doctorId: number): Observable<any> {
    const url = `${this.apiUrl}/getEventsForDoctor/${doctorId}`;
    return this.http.get(url);
  }
}
