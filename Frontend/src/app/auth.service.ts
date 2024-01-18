import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: any;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.config.getConfig().subscribe(config => {
      this.baseUrl = config.API_URL;
      console.log('API URL:', this.baseUrl);
    });
  }

  signup(data: any) {
    const url = `${this.baseUrl}/users/signup`;
    return this.http.post(url, data);
  }

  signin(data: any) {
    const url = `${this.baseUrl}/users/signin`;
    return this.http.post(url, data);
  }
}
