import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from './config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = '../config.json';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(this.configUrl);
  }
}
